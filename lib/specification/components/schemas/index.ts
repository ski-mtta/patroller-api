import authentication from "./authentication";
import patrollers from "./patrollers";
import directors from "./directors";
import properties from "./properties"

export default {
    ...authentication,
    ...patrollers,
    ...directors,
    ...properties
};
