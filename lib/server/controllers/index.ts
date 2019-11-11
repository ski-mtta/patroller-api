import * as authentication from "./authentication";
import * as patroller from "./patroller";
import * as schedule from "./schedule";

export default {
    ...authentication,
    ...schedule,
    ...patroller
};
