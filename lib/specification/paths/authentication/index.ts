const AUTHENTICATION_PATH = `/authentication`;



export default {
    [AUTHENTICATION_PATH]: {
        summary: "Authentication Service",
        description: "Authentication APIs for Ski Patroller Web Services",
        post: require("./post").default
    }
};
