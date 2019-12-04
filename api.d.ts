declare namespace Components {
    namespace Schemas {
        /**
         * JSON Web Token (JWT) used in Authorization header when making authenticated requests.
         */
        export type AccessToken = string; // jwt
        /**
         * Patroller Attendee Information
         */
        export interface Attendee {
            /**
             * First Name of the Ski Patroller
             */
            displayName?: string;
            /**
             * Email address
             * example:
             * example@email.com
             */
            email: string;
            /**
             * RSVP comment to attach to scheduled event
             */
            comment?: string;
            /**
             * Patroller Overnight Guest Count
             * Patroller overnight guest count, in addition to patroller.
             * example:
             * 1
             */
            additionalGuests?: number; // int32
        }
        /**
         * Patroller Attendee Information
         */
        export type Attendees = {
            /**
             * Ski Patrol Number
             * Ski Patrol Number
             * example:
             * 59
             */
            spNumber?: number; // int32
            /**
             * First Name of the Ski Patroller
             */
            displayName?: string;
            /**
             * Email address
             * example:
             * example@email.com
             */
            email?: string;
            /**
             * RSVP comment to attach to scheduled event
             */
            comment?: string;
            /**
             * Patroller Overnight Guest Count
             * Patroller overnight guest count, in addition to patroller.
             * example:
             * 1
             */
            additionalGuests?: number; // int32
        }[];
        export interface AuthenticationPostRequest {
            /**
             * Ski Patrol Number
             * Ski Patrol Number
             * example:
             * 59
             */
            sp_number: number; // int32
            /**
             * Personal password
             * example:
             * UyBC7KELE5ulVC1zKWYCEiY9QS4tRsXk7y8A80CEj8M=
             */
            password: string;
        }
        export interface AuthenticationPostResponse {
            /**
             * JSON Web Token (JWT) used in Authorization header when making authenticated requests.
             */
            access_token: string; // jwt
        }
        /**
         * The city for the physical address.
         * example:
         * Ashford
         */
        export type City = string;
        /**
         * RSVP comment to attach to scheduled event
         */
        export type Comment = string;
        /**
         * Date representing the start or ending of a given event (e.g. patrol duty)
         */
        export type Date = string; // date
        /**
         * Email address
         * example:
         * example@email.com
         */
        export type Email = string;
        /**
         * First Name of the Ski Patroller
         */
        export type FirstName = string;
        /**
         * Patroller Overnight Guest Count
         * Patroller overnight guest count, in addition to patroller.
         * example:
         * 1
         */
        export type GuestCount = number; // int32
        /**
         * Boolean (true/false) indicated whether the event is a certain type of patrol (e.g. overnight patrol == true)
         * example:
         * true
         */
        export type IsPatrolType = boolean;
        /**
         * Last Name of the Ski Patroller
         */
        export type LastName = string;
        /**
         * MTTA defined locations (e.g. High Hut)
         * example:
         * High Hut
         */
        export type Location = "High Hut" | "Copper Creek" | "The Yurt" | "Snow Bowl" | "Alpina Shed" | "Fire Hall" | "Office" | "Whittakers";
        /**
         * Personal password
         * example:
         * UyBC7KELE5ulVC1zKWYCEiY9QS4tRsXk7y8A80CEj8M=
         */
        export type Password = string;
        /**
         * Patroller ID
         * Patroller ID (uuidV4) used when making API requests.
         * example:
         * 00000000-0000-0000-0000-000000000000
         */
        export type PatrollerId = string; // uuid
        export type PatrollersGetAllResponse = PatrollersGetResponse[];
        export interface PatrollersGetResponse {
            id: PatrollerId; // uuid
            /**
             * First Name of the Ski Patroller
             */
            first_name: string;
            /**
             * Last Name of the Ski Patroller
             */
            last_name: string;
            /**
             * Ski Patrol Number
             * Ski Patrol Number
             * example:
             * 59
             */
            sp_number: number; // int32
            /**
             * Email address
             * example:
             * example@email.com
             */
            email: string;
            /**
             * Phone number
             * example:
             * 360-569-2451
             */
            phone_number?: string;
            primary_phone: PhoneNumber;
            secondary_phone?: PhoneNumber;
            physical_address: PhysicalAddress;
        }
        export interface PatrollersPostRequest {
            /**
             * First Name of the Ski Patroller
             */
            first_name: string;
            /**
             * Last Name of the Ski Patroller
             */
            last_name: string;
            /**
             * Ski Patrol Number
             * Ski Patrol Number
             * example:
             * 59
             */
            sp_number: number; // int32
            /**
             * Personal password
             * example:
             * UyBC7KELE5ulVC1zKWYCEiY9QS4tRsXk7y8A80CEj8M=
             */
            password: string;
            /**
             * Email address
             * example:
             * example@email.com
             */
            email: string;
            primary_phone: PhoneNumber;
            secondary_phone?: PhoneNumber;
            physical_address: PhysicalAddress;
        }
        export interface PatrollersPostResponse {
            /**
             * JSON Web Token (JWT) used in Authorization header when making authenticated requests.
             */
            access_token: string; // jwt
            id: PatrollerId; // uuid
            /**
             * First Name of the Ski Patroller
             */
            first_name: string;
            /**
             * Last Name of the Ski Patroller
             */
            last_name: string;
            /**
             * Ski Patrol Number
             * Ski Patrol Number
             * example:
             * 59
             */
            sp_number: number; // int32
            /**
             * Email address
             * example:
             * example@email.com
             */
            email: string;
            primary_phone: PhoneNumber;
            secondary_phone?: PhoneNumber;
            physical_address: PhysicalAddress;
        }
        /**
         * Phone number
         * example:
         * 360-569-2451
         */
        export type PhoneNumber = string;
        /**
         * Physical Address for Ski Patroller
         */
        export interface PhysicalAddress {
            /**
             * The street address for the physical address
             * example:
             * 29815 WA-706
             */
            street_address?: string;
            /**
             * The city for the physical address.
             * example:
             * Ashford
             */
            city: string;
            /**
             * The state for the physical address
             * example:
             * WA
             */
            state?: string;
            /**
             * The zip code for the physical address
             * example:
             * 98304
             */
            zip_code?: string;
        }
        export interface ScheduleGetResponse {
            start_date: Date; // date
            end_date: Date; // date
            attendees: Attendees;
            sp_number: SpNumber; // int32
            location: Location;
            day: IsPatrolType;
            overnight: IsPatrolType;
        }
        export interface SchedulePostRequest {
            start_date: Date; // date
            end_date: Date; // date
            attendee: Attendee;
            sp_number: SpNumber; // int32
            location: Location;
            day: IsPatrolType;
            overnight: IsPatrolType;
        }
        export interface SchedulePostResponse {
            start_date: Date; // date
            end_date: Date; // date
            location: Location;
            day: IsPatrolType;
            overnight: IsPatrolType;
        }
        /**
         * Ski Patrol Number
         * Ski Patrol Number
         * example:
         * 59
         */
        export type SpNumber = number; // int32
        /**
         * The state for the physical address
         * example:
         * WA
         */
        export type State = string;
        /**
         * The street address for the physical address
         * example:
         * 29815 WA-706
         */
        export type StreetAddress = string;
        /**
         * The zip code for the physical address
         * example:
         * 98304
         */
        export type ZipCode = string;
    }
}
declare namespace Paths {
    namespace CreateAuthToken {
        export type RequestBody = Components.Schemas.AuthenticationPostRequest;
        namespace Responses {
            export type $200 = Components.Schemas.AuthenticationPostResponse;
        }
    }
    namespace CreatePatroller {
        export type RequestBody = Components.Schemas.PatrollersPostRequest;
        namespace Responses {
            export type $200 = Components.Schemas.PatrollersPostResponse;
        }
    }
    namespace GetPatroller {
        namespace Parameters {
            /**
             * Ski Patrol Number
             * Ski Patrol Number
             * example:
             * 59
             */
            export type SpNumber = number; // int32
        }
        export interface PathParameters {
            sp_number: Parameters.SpNumber; // int32
        }
        namespace Responses {
            export type $200 = Components.Schemas.PatrollersGetResponse;
        }
    }
    namespace GetPatrollerSchedule {
        namespace Parameters {
            /**
             * Ski Patrol Number
             * Ski Patrol Number
             * example:
             * 59
             */
            export type SpNumber = number; // int32
        }
        export interface PathParameters {
            sp_number: Parameters.SpNumber; // int32
        }
        namespace Responses {
            export type $200 = Components.Schemas.ScheduleGetResponse;
        }
    }
    namespace GetPatrollers {
        namespace Responses {
            export type $200 = Components.Schemas.PatrollersGetAllResponse;
        }
    }
    namespace PostPatrollerSchedule {
        namespace Parameters {
            /**
             * Ski Patrol Number
             * Ski Patrol Number
             * example:
             * 59
             */
            export type SpNumber = number; // int32
        }
        export interface PathParameters {
            sp_number: Parameters.SpNumber; // int32
        }
        export type RequestBody = Components.Schemas.SchedulePostRequest;
        namespace Responses {
            export type $200 = Components.Schemas.SchedulePostResponse;
        }
    }
}
