import uuid from "uuid/v4";
import generator from "generate-password";
import argon2 from "argon2";
import jwt from 'jsonwebtoken';

import Database, { Entities } from "../../database"; // Now this instance is the same connection;
import { initLogger } from "../utils/logger";

const { private_key } = require("../../../config.json");

// Initiate Logger for Handlers
const LOGGER = initLogger();

async function verifyToken(token: string): Promise<number> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, private_key, (error: any, data: any) => {
            if (error) { return reject(error) }
            return resolve(data.sp_number);
        })
    })
}

async function generateJwt(sp_number: number): Promise<string> {

    const token = jwt.sign({
        sp_number
    }, private_key, { expiresIn: '7d' });

    return token
}

async function verifyPassword(request: Components.Schemas.AuthenticationPostRequest): Promise<boolean> {
    const query = Database.connectionManager.get().manager;
    const { sp_number, password } = request;
    try {
        const patroller = await query.createQueryBuilder(Entities.Patroller, 'patroller').where("patroller.sp_number = :sp_number", {
            sp_number
        }).getOne();

        if (!patroller) {
            return false;
        }

        console.log('patroller', patroller);

        if (
            patroller.password == password
            || (await argon2.verify(patroller.password, password))
        ) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

export async function createAccessToken(request: Components.Schemas.AuthenticationPostRequest): Promise<Components.Schemas.AuthenticationPostResponse> {
    try {
        const verified = await verifyPassword(request);

        if (!verified) {
            throw new Error("Patroller Authentication Failed.")
        }

        return {
            access_token: await generateJwt(request.sp_number)
        }
    } catch (error) {
        throw error;
    }
}

export async function updatePassword(sp_number: number, new_password: string, old_password: string): Promise<Components.Schemas.AuthenticationPostResponse> {

    if (!(await verifyPassword({ sp_number, password: old_password }))) {
        throw new Error("Patroller Authentication Failed.")
    }

    const query = Database.connectionManager.get().manager;
    await query
        .createQueryBuilder(Entities.Patroller, 'patroller')
        .update()
        .set({ password: await argon2.hash(new_password) })
        .where("sp_number = :sp_number", { sp_number })
        .execute();

    return {
        access_token: await generateJwt(sp_number)
    }
}