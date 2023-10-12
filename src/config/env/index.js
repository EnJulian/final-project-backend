const development = require('./development');
const test = require('./test');
const production = require('./production');
const dotenv = require("dotenv");

dotenv.config();

const environment = {
    development,
    test,
    production,
};

module.exports = environment[process.env.NODE_ENV || 'development'];
