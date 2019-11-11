import Database, { Entities } from "../../database"; // Now this instance is the same connection;

import { initLogger } from "../utils/logger";

// Initiate Logger for Handlers
const LOGGER = initLogger();

export async function postPatrollerSchedule(schedule: Components.Schemas.SchedulePostRequest): Promise<Components.Schemas.SchedulePostResponse> {
    LOGGER.info("Create New Schedule");
    return {
        attendees: []
    };
}
