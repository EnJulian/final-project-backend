// Imports database config
require('./src/config/database.config')
const fileupload = require('express-fileupload')
const express = require('express');
const ap1Version1 = require('./src/config/versioning/v1')
const envConfig = require('./src/config/env/index')
const { notFound, appErrorHandler, genericErrorHandler } = require('./src/middlewares/error.middleware');

const app = express();

app.use(express.json())
app.use(fileupload({limit: 50*1024*1024}))
const cors = require('cors');
app.use(cors());


const PORT = envConfig.APP_PORT || 7006;

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
})

app.use('/api/v1', ap1Version1);
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound)

module.exports = app;
