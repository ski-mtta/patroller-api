export default {
    tags: ["Patrollers"],
    summary: "Create a New Patroller",
    description:
        "Create a new patroller",
    operationId: "createPatroller",
    requestBody: {
        description: "Ski Patroller Information",
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref:
                        "#/components/schemas/patrollers_post_request"
                }
            }
        }
    },
    "x-swagger-router-controller": "controllers/patrollers",
    responses: {
        200: {
            description: "Successfully created a new ski patroller",
            content: {
                "application/json": {
                    schema: {
                        $ref:
                            "#/components/schemas/patrollers_post_response"
                    }
                }
            }
        }
    }
}