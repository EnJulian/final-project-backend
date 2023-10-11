const express = require('express');
const router = express.Router()
const { createUser, signInUser, updateAssessmentTakenStatus, updateAssessmentScore, fetchAllUsers } = require('../controllers/user.controller')

router.post('/signup', createUser);
router.post('/login', signInUser);
router.get('/', fetchAllUsers);
router.patch('/taken', updateAssessmentTakenStatus);
router.patch('/score', updateAssessmentScore);

module.exports = router;
