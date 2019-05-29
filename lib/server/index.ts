import express, { Application, Request, Response } from "express";
import { connector } from "swagger-routes-express";
import log4js, { Logger } from "log4js";
import bodyParser from "body-parser";

import { initLogger } from "./utils/logger";
import { PatrollerApiOptions } from "./interfaces";

export default class PatrollerApi {
    spec: object; // oas 3.0 specification
    api: object;
    app: Application;
    logger: Logger;
    port: number;

    constructor(options: PatrollerApiOptions) {
        this.logger = initLogger(options.logger || {});
        this.spec = require("../specification").default;
        this.api = require("./controllers").default;

        // create express app
        this.app = express();

        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }))
        
        // parse application/json
        this.app.use(bodyParser.json())

        // Connect swagger-routes-express;
        connector(this.api, this.spec, undefined)(this.app);
        this.port = options.port || 5000;
        this.app.listen(this.port, () => {
            this.logger.info(`Patroller API Listening on ${this.port}`);
        });
    }
}
