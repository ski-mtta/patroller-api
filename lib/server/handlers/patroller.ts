import uuid from "uuid/v4";
import generator from "generate-password";
import Database, { Entities } from "../../database"; // Now this instance is the same connection;

import { initLogger } from "../utils/logger";

// Initiate Logger for Handlers
const LOGGER = initLogger();

export async function createPatroller(patroller: Components.Schemas.PatrollersPostRequest): Promise<Components.Schemas.PatrollersPostResponse> {
    const query = Database.connectionManager.get().manager;

    const patroller_entity = new Entities.Patroller();
    const physical_address = new Entities.PhysicalAddress();

    // Setup Physical Address
    physical_address.id = uuid();
    physical_address.city = patroller.physical_address.city;

    // Optional Values;
    physical_address.street_address = patroller.physical_address.street_address || "";
    physical_address.state = patroller.physical_address.state || "";
    physical_address.zip_code = patroller.physical_address.zip_code || "";

    // Save Physical Address
    await query.save(physical_address).catch((error) => {
        LOGGER.error("Could not save physical address: ", error);
        throw error;
    });

    // Create new uuid for patroller
    patroller_entity.id = uuid();

    // Hash this password
    patroller_entity.password = patroller.password || generator.generate({
        length: 6,
        numbers: true
    });
    patroller_entity.first_name = patroller.first_name;
    patroller_entity.last_name = patroller.last_name;
    patroller_entity.sp_number = patroller.sp_number;
    patroller_entity.email = patroller.email;
    patroller_entity.primary_phone = patroller.primary_phone;
    patroller_entity.secondary_phone = patroller.secondary_phone;
    patroller_entity.physical_address = physical_address;

    await query.save(patroller_entity).catch((error) => {
        LOGGER.error("Could not save patroller: ", error);
        throw error;
    });

    return {
        ...patroller_entity,
        access_token: ""
    }
}

export async function getPatrollerBySpNumber(sp_number: string): Promise<Components.Schemas.PatrollersGetResponse> {
    const query = Database.connectionManager.get().manager;

    const patroller = await query.createQueryBuilder(Entities.Patroller, 'patroller').where("patroller.sp_number = :sp_number", {
        sp_number
    }).getOne();

    if (!patroller) {
        throw new Error(`Patroller ${sp_number} Not Found`);
    }

    LOGGER.info("Found Patroller", patroller)

    return {
        id: patroller.id,
        first_name: patroller.first_name,
        last_name: patroller.last_name,
        sp_number: parseInt(sp_number),
        email: patroller.email,
        primary_phone: patroller.primary_phone,
        secondary_phone: patroller.secondary_phone,
        physical_address: patroller.physical_address,
    }
}


export async function deletePatrollers(): Promise<void> {
    try {
        const query = Database.connectionManager.get().manager;
        await query.createQueryBuilder(Entities.PhysicalAddress, 'physical_address').delete().execute();
        const { affected } = await query.createQueryBuilder(Entities.Patroller, 'patroller').delete().execute();
        LOGGER.info(`Deleted ${affected} Patrollers from Database`);
        return;
    } catch (error) {
        LOGGER.error(`Error deleting patrollers`, error);
        throw error;
    }
}

export async function getPatrollers(): Promise<any> {
    try {
        const query = Database.connectionManager.get().manager;
        const patrollers = await query.createQueryBuilder(Entities.Patroller, 'patroller').getMany();
        return patrollers;
    } catch (error) {
        throw error;
    }
}