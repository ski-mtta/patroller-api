declare namespace Components {
    namespace Schemas {
        /**
         * JSON Web Token (JWT) used in Authorization header when making authenticated requests.
         */
        export type AccessToken = string; // jwt
        export interface AuthenticationPostRequest {
            /**
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
         * Last Name of the Ski Patroller
         */
        export type LastName = string;
        /**
         * Personal password
         * example:
         * UyBC7KELE5ulVC1zKWYCEiY9QS4tRsXk7y8A80CEj8M=
         */
        export type Password = string;
        /**
         * Patroller ID (uuidV4) used when making API requests.
         */
        export type PatrollerId = string;
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
            /**
             * Phone number
             * example:
             * 360-569-2451
             */
            phone_number: string;
            physical_address: PhysicalAddress;
        }
        export interface PatrollersPostResponse {
            /**
             * Patroller ID (uuidV4) used when making API requests.
             */
            patroller_id: string;
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
            phone_number: string;
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
            street_address: string;
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
            state: string;
            /**
             * The zip code for the physical address
             * example:
             * 98304
             */
            zip_code: string;
        }
        /**
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
}
