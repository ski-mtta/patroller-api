const PatrollerApi = require('../dist/server').default;
const config = require('../config.json');
const credentials = require("../service-credentials.json");
const api = new PatrollerApi({
    ...config,
    google_credentials: credentials
});