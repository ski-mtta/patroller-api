import street_address from "./street_address";
import city from "./city";
import state from "./state";
import zip_code from "./zip_code";

export default {
    type: "object",
    description: "Physical Address for Ski Patroller",
    required: [
        "street_address",
        "city",
        "state",
        "zip_code",
    ],
    properties: {
        street_address,
        city,
        state,
        zip_code,
    }
};
