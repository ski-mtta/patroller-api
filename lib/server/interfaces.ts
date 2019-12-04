import { ConnectionOptions } from "typeorm";

export interface PatrollerApiOptions {
    databaseOptions: ConnectionOptions;
    loadPatrollers?: boolean,
    patrollerRosterPath?: String,
    port?: number;
    logger?: LoggerOptions;
    googleCredentials?: GoogleCredentials;
}

export interface LoggerOptions {
    log_name?: string,
    type?: string,
    level?: string
}

export interface GoogleCredentials {
    type: string,
    project_id: string,
    private_key_id: string,
    private_key: string,
    client_email: string,
    client_id: string,
    auth_uri: string,
    token_uri: string,
    auth_provider_x509_cert_url: string,
    client_x509_cert_url: string,
}

export enum Locations {
    HighHut = "High Hut",
    CopperCreek = "Copper Creek",
    Yurt = "The Yurt",
    SnowBowl = "Snow Bowl",
    AlpinaShed = "Alpina Shed",
    FireHall = "Fire Hall",
    Office = "Office",
    Whittakers = "Whittakers",
}

export enum PatrolType {
    Overnight = "Overnight",
    Day = "Day"
}

export enum MaxOvernights {
    CopperCreek = 4,
    SnowBowl = 3,
    HighHut = 3,
    Yurt = 2,
    Office = 2,
}

export interface SearchEventOptions {
    q?: string,
    timeMin?: string, // new Date().toISOString()
    timeMax?: string, // new Date().toISOString()
    singleEvents?: boolean,
    orderBy?: string
}
export interface Attendee {
    displayName: string,
    comment: string,
    email: string,
    additionalGuests?: number,
}

export interface SchedulePatroller {
    startDate: string,
    endDate: string,
    location: Locations | string,
    sp_number: number,
    day: boolean,
    overnight: boolean,
    attendee: Attendee
};