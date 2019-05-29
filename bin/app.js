const PatrollerApi = require('../dist/server').default;

const api = new PatrollerApi({
    port: 5000,
    logger: {
        type: 'stdout',
        level: 'info',
    }
});