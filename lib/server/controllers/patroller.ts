import { Request, Response } from "express";

export function createPatroller(req: Request, res: Response): Response {
    const request = req.body as Components.Schemas.PatrollersPostRequest;
    console.log("req", req);
    return res.status(200).json({
        access_token: ""
    });
}