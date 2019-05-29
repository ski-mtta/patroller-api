import { Request, Response } from "express";

export function createPatroller(req: Request, res: Response): Response {
    const { 
        first_name,
        last_name,
        sp_number,
        
    } = req.body as Components.Schemas.PatrollersPostRequest;
    console.log("sp_number", sp_number);
    return res.status(200).json({
        access_token: ""
    });
}