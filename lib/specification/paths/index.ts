import authentication from "./authentication";
import directors from "./directors";
import patrollers from "./patrollers";


export default {
    ...authentication,
    ...directors,
    ...patrollers
}