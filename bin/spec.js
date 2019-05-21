const spec = require('../dist/specification').default;
const { SchemaValidator } = require('@smartrecruiters/openapi-schemas-validator')
const version = 3;

const validator = new SchemaValidator(spec)

if (!validator.valid) {
    console.log('errors', JSON.stringify(validator.error, null, 2));
} else {
    console.log("Schema is Valid!");
}


