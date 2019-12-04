import { GoogleCredentials, SearchEventOptions, Locations, MaxOvernights, SchedulePatroller, Attendee } from '../server/interfaces';
import CalendarApi from "node-google-calendar";

export default class CalendarService {
    api: any;
    calendarId: any

    constructor(options: GoogleCredentials) {
        this.calendarId = {
            primary: 'no-reply@skimtta.services'
        }

        this.api = new CalendarApi({
            key: options.private_key,
            serviceAcctId: options.client_email,
            timezone: 'GMT-7:00', // Pacific Time Zone
            calendarId: this.calendarId
        })
    }

    async getCalendars(): Promise<any[]> {
        return await this.api.CalendarList.list(this.calendarId.primary, {})
    }

    async getEvents(options: SearchEventOptions): Promise<any> {
        try {
            const events = await this.api.Events.list(this.calendarId.primary, options || {})
            console.log('events', events);
            return events;
        } catch (error) {
            console.log('error', error);
            throw error;
        }

    }

    async updateEvent(target_event: any, new_attendee: Attendee): Promise<any> {
        let attendees = target_event.attendees || []
        return await this.api.Events.update(this.calendarId.primary, target_event.id, {
            ...target_event,
            reminders: {
                useDefault: false,
                overrides: [{
                    method: 'email',
                    minutes: 10080 // One Week in advance reminder

                }, {
                    method: 'popup',
                    minutes: 10080 // One Week in advance reminder

                }, {
                    method: 'email',
                    minutes: 1440 // One Day in advance reminder

                }, {
                    method: 'popup', // Popup reminder one day in advance
                    minutes: 1440
                }]
            },
            attendees: [
                ...attendees,
                {
                    ...new_attendee,
                    responseStatus: 'accepted'
                }
            ]
        }, {
            sendUpdates: 'all',
            guestsCanInviteOthers: false,
        });
    }

    async scheduleDayPatrol(details: SchedulePatroller): Promise<any> {
        const { startDate, endDate, location, attendee } = details
        console.log('details', details);
        const events = await this.getEvents({
            timeMin: startDate,
            timeMax: endDate,
            q: `${location} Day`,
            singleEvents: true,
            orderBy: 'startTime'
        });

        if (!events.length) {
            throw new Error("Failed to find event matching request");
        }

        return await this.updateEvent(events[0], attendee);
    }

    async scheduleOvernightPatrol(details: SchedulePatroller): Promise<any> {
        const { startDate, endDate, location, attendee } = details

        const events = await this.getEvents({
            timeMin: startDate,
            timeMax: endDate,
            q: `${location} Overnight`,
            singleEvents: true,
            orderBy: 'startTime'
        });

        if (!events.length) {
            throw new Error("Failed to find event matching request");
        }

        const target_event = events[0];

        let currently_reserved = this.calcCurrentlyReserved(target_event.attendees);

        if (!this.hasOvernightAvailability(location, attendee, currently_reserved)) {
            throw new Error(`Cannot reserve overnight bunk, current capacity is at ${currently_reserved}, and this reservation will exceed the max capacity of ${this.getMaxCapacityForLocation(location)} for ${location}. `);
        }

        return await this.updateEvent(events[0], attendee);
    }

    async schedulePatrol(details: SchedulePatroller): Promise<any[]> {
        const { day, overnight } = details

        if (!day && !overnight) {
            throw new Error("Patrolling event must include a 'day' and/or 'overnight' attribute");
        }

        let events = [];

        if (day) {
            console.log('Adding Day Event');
            let event = await this.scheduleDayPatrol(details)
            events.push(event);
        }

        if (overnight) {
            console.log('Adding Overnight Event');
            let event = await this.scheduleOvernightPatrol(details);
            events.push(event);
        }

        return events;
    }

    calcCurrentlyReserved(attendees: Attendee[]): number {
        if (!attendees || !attendees.length) {
            return 0
        } else {
            // map reduce the guests of the attendees;
            // remove one for the calendar service account
            return attendees.map((attendee: Attendee) => {
                return attendee.additionalGuests || 0;
            }).reduce((a, i) => {
                return a += i;
            }) + (attendees.length);
        }
    }

    getMaxCapacityForLocation(location: Locations | string): number {
        switch (location) {
            case Locations.CopperCreek:
                return MaxOvernights.CopperCreek
            case Locations.HighHut:
                return MaxOvernights.HighHut
            case Locations.Yurt:
                return MaxOvernights.Yurt
            case Locations.SnowBowl:
                return MaxOvernights.SnowBowl
            case Locations.Office:
                return MaxOvernights.Office
            default:
                // if the location does not exist for sleeping, it has no available overnight capacity
                return 0
        }
    }


    hasOvernightAvailability(location: Locations | string, new_attendee: Attendee, currently_reserved: number): boolean {
        // Return whether the attendees list + guests + new attendee w/ guest are greater than max capacity for the location

        // add one to represent the new attendee; ensure the guests of the attendee are also included.
        let max = currently_reserved + (new_attendee.additionalGuests || 0) + 1;

        return max < this.getMaxCapacityForLocation(location)
    }


}