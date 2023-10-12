const express = require('express');
const router = express.Router()
const { createUser, signInUser, updateAssessmentTakenStatus, updateAssessmentScore, fetchAllUsers } = require('../controllers/user.controller')
const { validateSignUpApplicantInput, validateApplicantLoginInput } = require('../middlewares/fileValidation.middleware')

router.post('/signup', validateSignUpApplicantInput, createUser);
router.post('/login', validateApplicantLoginInput, signInUser);
router.get('/', fetchAllUsers);
router.patch('/taken', updateAssessmentTakenStatus);
router.patch('/score', updateAssessmentScore);

module.exports = router;
