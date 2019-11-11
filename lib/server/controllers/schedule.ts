import { Request, Response } from "express";

import { schedule } from "../handlers";

export async function postPatrollerSchedule(req: Request, res: Response): Promise<Response> {
    try {
        const new_patroller = await schedule.postPatrollerSchedule(req.body as Components.Schemas.SchedulePostRequest);

        return res.status(201).json(new_patroller);
    } catch (error) {
        return res.status(error.status || 500).send(error);
    }
}