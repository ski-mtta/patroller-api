import sp_number from "../properties/sp_number";
import password from "../properties/password";

export default {
    type: "object",
    required: [
        "sp_number",
        "password"
    ],
    properties: {
        sp_number,
        password,
    }
};
