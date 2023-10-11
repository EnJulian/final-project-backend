const express = require('express');
const ApplicationController = require('../controllers/application.controller');
const {validAdmin, validApplicant} = require("../middlewares/permission.middleware");
const {userImageUploader, userCvUploader} = require('../middlewares/cloudinary.middleware')
// const {imgUpload, pdfUpload} = require('../../util/multer')


const router = express.Router();


router.post('/', validAdmin, ApplicationController.createApplication);
router.post('/apply', validApplicant, userImageUploader, ApplicationController.apply);
router.get('/', validAdmin, ApplicationController.fetchAllApplications);
router.get('/:id',validAdmin, ApplicationController.fetchSingleApplication);
// router.put('/:id', ApplicationController.updateSingleApplication);

module.exports = router

