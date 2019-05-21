import { Request, Response } from 'express';

export default function (req: Request, res: Response): Response {
    const { sp_number } = req.body;
    console.log('sp_number', sp_number);
    return res.status(200).json({
        access_token: ""
    });
}