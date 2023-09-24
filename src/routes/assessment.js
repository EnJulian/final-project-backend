const express = require('express');
const AssessmentController = require('../controllers/assessment.controller')
const {validAdmin, validApplicant} = require("../middlewares/permission.middleware");

const router = express.Router();

router.post('/', validAdmin, AssessmentController.createAssessment);
router.post('/take', validApplicant, AssessmentController.takeAssessment);

module.exports = router

