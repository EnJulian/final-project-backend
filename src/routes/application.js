const express = require('express');
const ApplicationController = require('../controllers/application.controller');
const {validAdmin, validApplicant} = require("../middlewares/permission.middleware");
const {userImageUploader, userCvUploader} = require('../middlewares/cloudinary.middleware')
// const {imgUpload, pdfUpload} = require('../../util/multer')


const router = express.Router();


router.post('/', validAdmin, ApplicationController.createApplication);
router.post('/apply', validApplicant, userImageUploader, userCvUploader, ApplicationController.apply);
router.get('/', validAdmin, ApplicationController.fetchAllApplications);
router.get('/check',validApplicant, ApplicationController.fetchApplicationById);
router.get('/:id',validAdmin, ApplicationController.fetchSingleApplication);
// router.put('/:id', ApplicationController.updateSingleApplication);
router.get('/date/:id', ApplicationController.getDate)

router.get('/status/:id', ApplicationController.gettingStatus)

module.exports = router

