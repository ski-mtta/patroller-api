import { Request, Response } from "express";

import { patroller } from "../handlers";

export async function createPatroller(req: Request, res: Response): Promise<Response> {
    try {
        const new_patroller = await patroller.createPatroller(req.body as Components.Schemas.PatrollersPostRequest);

        return res.status(201).json(new_patroller);
    } catch (error) {
        return res.status(error.status || 500).send(error);
    }
}

export async function getPatroller(req: Request, res: Response): Promise<Response> {
    const { sp_number } = req.params;
    try {
        const response = await patroller.getPatrollerBySpNumber(sp_number)

        return res.status(200).send(response)
    } catch (error) {
        return res.status(error.status || 500).send(error);
    }
}

export async function getPatrollers(req: Request, res: Response): Promise<Response> {
    const { sp_number } = req.params;
    try {
        const response = await patroller.getPatrollers()

        return res.status(200).send(response);
    } catch (error) {
        return res.status(error.status || 500).send(error);
    }
}