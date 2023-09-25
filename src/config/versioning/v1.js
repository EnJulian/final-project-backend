const express = require('express');
const api = express.Router()
const users = require('../../routes/user')
const application = require('../../routes/application')
const assessment = require('../../routes/assessment')
const {authenticate} = require("../../middlewares/auth.middleware");

api.get("/", (req, res) => res.status(200).json({
    status: 'success',
    message: 'Welcome to My App API'
}))

api.use("/users", users);
api.use("/application", authenticate, application);
api.use("/assessment", authenticate, assessment);


module.exports = api
