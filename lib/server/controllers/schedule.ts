import { Request, Response } from "express";

import { schedule } from "../handlers";

export async function postPatrollerSchedule(req: Request, res: Response): Promise<Response> {
    try {
        const { body, params: { sp_number } } = req;
        const newEvent = await schedule.postPatrollerSchedule({
            ...body,
            sp_number
        } as Components.Schemas.SchedulePostRequest);

        return res.status(201).json(newEvent);
    } catch (error) {
        console.log('error', error);
        return res.status(error.status || 500).send(error);
    }
}

export async function getPatrollerSchedule(req: Request, res: Response): Promise<Response> {
    try {
        const { sp_number } = req.params;
        const data = await schedule.getPatrollerSchedule(+sp_number);
        return res.status(201).json([]);
    } catch (error) {
        return res.status(error.status || 500).send(error);
    }
}