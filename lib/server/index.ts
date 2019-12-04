import express, { Application, Request, Response, Router } from "express";
import { connector } from "swagger-routes-express";
import bearerToken from "express-bearer-token";
import log4js, { Logger } from "log4js";
import bodyParser from "body-parser";
import cors from "cors";
import csv from 'csv-parser'
import fs, { PathLike } from 'fs'

import { initLogger } from "./utils/logger";
import { PatrollerApiOptions } from "./interfaces";
import Database from "../database";
import { patroller as PatrollerHandlers } from "./handlers";

export default class PatrollerApi {
    spec: object; // oas 3.0 specification
    controllers: object;
    app: Application;
    logger: Logger;
    port: number;
    // database: Database;

    constructor(options: PatrollerApiOptions) {
        this.logger = initLogger(options.logger || {});
        this.spec = require("skimtta-oas/dist/openapi.json");
        this.controllers = require("./controllers").default;

        // this.database = new Database(options.databaseOptions)

        // create express app
        this.app = express();

        this.app.use(cors());

        // Attempt to parse access token from Authorization Bearer header;
        this.app.use(bearerToken());

        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }))

        // parse application/json
        this.app.use(bodyParser.json())

        // this.app.use((req, res, next) => {
        //     console.log("Incoming Request to: ", req.path);
        //     next();
        // })

        // Connect swagger-routes-express;
        connector(this.controllers, this.spec, undefined)(this.app);
        this.port = options.port || 5000;
        this.app.listen(this.port, async () => {
            try {
                this.logger.info(`Patroller API Listening on ${this.port}`);
                await Database.connection.connect();
                this.logger.info("Established Connection to Database");

                // Optionally Load Patroller Roster from CSV file
                // Requires configuration settings for `loadPatrollers` boolean option
                // and `patrollerRosterPath` for CSV file path;
                // Will throw an error if not found on start-up
                if (options.loadPatrollers == true) {
                    if (!options.patrollerRosterPath) {
                        throw new Error("Patroller Roster CSV Path Not Found!")
                    } else {
                        // Internally, this will delete all existing patrollers and load new patroller data;
                        await this.loadPatrollers(options.patrollerRosterPath)
                    }
                }
            } catch (error) {
                console.log('Failed to connect to DB', error);
            }
        });
    }

    // NOTE: This method will delete all current patrollers in the db and restore information given
    // a path to an updated Roster
    async loadPatrollers(roster_path: String) {
        // WARNING: This method calls delete patrollers before loading new patroller roster data;
        // CAREFUL IF YOU ARE RUNNING IN PRODUCTION, THIS MAY RESULT IN LOSS OF DATA IF NOT BACKED UP.
        await PatrollerHandlers.deletePatrollers();

        // Load New Patroller Information from CSV
        let patrollers: any[] = [];
        fs.createReadStream(roster_path as PathLike)
            .pipe(csv())
            .on('data', (data) => patrollers.push(data))
            .on('end', async () => {
                patrollers.map(async (patroller) => {
                    try {
                        const saved_patroller = await PatrollerHandlers.createPatroller({
                            ...patroller,
                            primary_phone: patroller.cell_phone || patroller.home_phone,
                            secondary_phone: patroller.home_phone ? patroller.home_phone : "not_available",
                            physical_address: {
                                city: patroller.town
                            },
                        });
                    } catch (error) {
                        console.log("Found Error: ", error);
                    }
                });
                this.logger.info(`Loaded ${patrollers.length} Patrollers from Roster`);
            });
    }
}
