import info from "./info";

import {
    development
} from "./servers";

import paths from "./paths";
import components from "./components"

export default {
    openapi: "3.0.0",
    info,
    servers: [
        development
    ],
    paths,
    components
}