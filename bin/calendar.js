const CalendarService = require('../dist/calendar').default;
const credentials = require("../service-credentials.json");
const api = new CalendarService(credentials);

api.schedulePatrol({
    startDate: new Date('9/15/19').toISOString(),
    endDate: new Date('9/16/19').toISOString(),
    location: 'Copper Creek',
    day: true,
    overnight: true,
    attendee: {
        displayName: "Ryan Tate - Patrol 48",
        comment: "Heading to Copper Creek with potential patroller",
        email: "ryan.michael.tate@gmail.com",
        additionalGuests: 1
    }
}).then((events) => {
    console.log('events', events);
}).catch((error) => {
    console.log('error', error);
})