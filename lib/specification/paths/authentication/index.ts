const AUTHENTICATION_PATH = `/authentication`;


export default {
    [AUTHENTICATION_PATH]: {
        summary: "Authentication Service",
        description: "Authentication APIs for Ski Patroller Web Services",
        post: {
            tags: ["Authentication"],
            summary: "Create JWT",
            description: "Create JWT using Ski Patrol Number and Password Credentials",
            operationId: "createAuthToken",
            requestBody: {
                description: "Ski Patrol Number and Password",
                // required: true,
                content: {
                    "application/json": {
                        schema: {
                            "$ref": "#/components/schemas/authentication_post_request"
                        }
                    }
                }
            },
            "x-swagger-router-controller": "controllers/authentication",
            responses: {
                200: {
                    description: "Successfully Logged In",
                    content: {
                        "application/json": {
                            schema: {
                                "$ref": "#/components/schemas/authentication_post_response"
                            }
                        }
                    }
                }
            }
        }
    },
}