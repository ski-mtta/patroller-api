import sp_number from '../sp_number';
import password from '../password';

export default {
    type: "object",
    required: [
        "sp_number",
        "password"
    ],
    properties: {
        sp_number,
        password
    }
}