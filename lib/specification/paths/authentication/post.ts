export default {
    tags: ["Authentication"],
    summary: "Create JWT",
    description:
        "Create JWT using Ski Patrol Number and Password Credentials",
    operationId: "createAuthToken",
    requestBody: {
        description: "Ski Patrol Number and Password",
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref:
                        "#/components/schemas/authentication_post_request"
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
                        $ref:
                            "#/components/schemas/authentication_post_response"
                    }
                }
            }
        }
    }
}