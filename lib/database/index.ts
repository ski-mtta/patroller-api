import "reflect-metadata";
import { Connection, ConnectionManager, ConnectionOptions } from "typeorm";


const DATABASE_OPTIONS = require("../../ormconfig.json");

class Database {
    connection: Connection;
    connectionManager: ConnectionManager;

    constructor(options: ConnectionOptions) {
        this.connectionManager = new ConnectionManager();
        this.connection = this.connectionManager.create(options);
    }
}

const database = new Database(DATABASE_OPTIONS);

export default database;
export { default as Entities } from "./entity/";