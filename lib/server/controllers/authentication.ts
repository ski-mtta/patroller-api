import { Request, Response } from "express";

import { authentication } from "../handlers";

export async function createAuthToken(req: Request, res: Response): Promise<Response> {
    const data = await authentication.createAccessToken(req.body as Components.Schemas.AuthenticationPostRequest);
    return res.status(200).send(data);
}
