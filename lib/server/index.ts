import openApiFirst from '@smartrecruiters/openapi-first';
import express, { Application, Request, Response } from 'express';

const queryMiddleware = require('@smartrecruiters/openapi-first/middlewares/query/defaults');
const controllerMiddleware = require('@smartrecruiters/openapi-first/middlewares/controllers/by-property');

export default class PatrolApi {
    spec: object; // oas 3.0 specification
    app: Application
    api: Application

    constructor() {
        this.spec = require('../specification');

        // create express app
        this.app = express();

        // create open api specification initializer
        this.api = openApiFirst(this.app, this.spec)

        // this.app.use((req: Request, res: Response, next) => {
        //     console.log('req', req.path);
        //     next();
        // })

        // to enable setting default values on empty query params
        // this.api.use(queryMiddleware())

        const dir = `${process.cwd()}/dist/server`;
        console.log('dir', dir);

        // to link the specification with code in 'api' directory
        this.api.use(controllerMiddleware({ dir }))

        this.app.listen(8080)
        console.log("server listening on 8080");
    }
}

