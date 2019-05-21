import authentication from "./authentication";
import patrollers from "./patrollers";
import directors from "./directors";

export default {
    ...authentication,
    ...patrollers,
    directors
}