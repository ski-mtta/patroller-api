const { SchemaValidator } = require('@smartrecruiters/openapi-schemas-validator')
const jsonfile = require('jsonfile');

const SPEC = require('../dist/specification').default;
const OUTPUT_DIRECTORY = `${process.cwd()}/dist/specification`;
const FILE_NAME = 'openapi.json';
const FILE_PATH = `${OUTPUT_DIRECTORY}/${FILE_NAME}`;

const { validator } = new SchemaValidator(SPEC)

if (!validator.valid) {
    console.log('validator', validator);
    console.error("Specification is invalid");
} else {
    jsonfile.writeFile(FILE_PATH, SPEC).then(() => {
        console.log(`Wrote file to ${FILE_PATH}`);
    }).catch((error) => {
        console.error(error);
    })
}


