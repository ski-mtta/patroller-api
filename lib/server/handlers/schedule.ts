import Database, { Entities } from "../../database"; // Now this instance is the same connection;
import CalendarService from '../../calendar';
import { initLogger } from "../utils/logger";

const credentials = require("../../../service-credentials.json");
const calendar = new CalendarService(credentials);

// Initiate Logger for Handlers
const LOGGER = initLogger();

export async function postPatrollerSchedule(schedule: any): Promise<Components.Schemas.SchedulePostResponse> {
    const query = Database.connectionManager.get().manager;
    const event = await calendar.schedulePatrol(schedule);
    console.log('schedule', schedule);
    const patroller = await query.createQueryBuilder(Entities.Patroller, 'patroller').where("patroller.sp_number = :sp_number", {
        sp_number: schedule.sp_number
    }).getOne();

    if (!patroller) {
        throw new Error("Failed to find patroller");
    }

    const new_schedule = new Entities.Schedules();

    new_schedule.id = event[0].id;
    new_schedule.location = schedule.location;
    new_schedule.start_date = schedule.startDate;
    new_schedule.end_date = schedule.endDate;
    new_schedule.day = schedule.day;
    new_schedule.overnight = schedule.overnight;
    new_schedule.additional_guests = schedule.attendee.additionalGuests;
    new_schedule.patroller = patroller;

    await query.save(new_schedule).catch((error) => {
        LOGGER.error("Failed to save schedule: ", error);
        throw error;
    });

    return {
        ...new_schedule,
        location: new_schedule.location as Components.Schemas.Location,
        start_date: schedule.startDate,
        end_date: schedule.endDate,
    };
}

export async function getPatrollerSchedule(sp_number: number): Promise<Components.Schemas.ScheduleGetResponse[]> {
    const query = Database.connectionManager.get().manager;
    const patroller = await query
        .createQueryBuilder(Entities.Patroller, 'patroller')
        .where("patroller.sp_number = :sp_number", {
            sp_number: sp_number
        })
        .getOne();

    if (!patroller) {
        throw new Error("Failed to find patroller");
    }

    const schedules = await query
        .createQueryBuilder(Entities.Schedules, 'schedules')
        .where("schedules.patroller = :patroller", {
            patroller: patroller.key
        })
        .getMany();

    console.log('schedules', schedules)

    // const events = await calendar.getEvents({});
    return []
}