const express = require('express');
const router = express.Router()
const { createUser, signInUser, updateAssessmentTakenStatus, updateAssessmentScore, fetchAllUsers, fetchUniqueApplication,
    fetchAdminCreds, findAdmin, updateAdmin
} = require('../controllers/user.controller')
const { validateSignUpApplicantInput, validateApplicantLoginInput } = require('../middlewares/fileValidation.middleware')
const {validAdmin} = require("../middlewares/permission.middleware");

router.post('/signup', validateSignUpApplicantInput, createUser);
router.post('/login', validateApplicantLoginInput, signInUser);
router.get('/', fetchAllUsers);
router.get('/single/:id', validAdmin, findAdmin);
router.patch('/update/:id', validAdmin, updateAdmin)
router.get('/admin', fetchAdminCreds);
router.get('/getapp', fetchUniqueApplication);
router.patch('/taken', updateAssessmentTakenStatus);
router.patch('/score', updateAssessmentScore);

module.exports = router;
