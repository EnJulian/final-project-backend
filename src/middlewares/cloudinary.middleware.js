const { runQuery } = require('../config/database.config');
const { findUserById } = require('../queries/users');

//const { setApplicantImageDb, setApplicantDocDb } = require('../services/applicant.service')

const cloudinary = require("../../util/cloudinary");
const {files} = require("express/lib/request");



const checkIfIdExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [user = null] = await runQuery(findUserById, [id]);
        if (!user) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Applicant does not exist',
                data: null,
            });
        }

        req.user = user;
        return next();
    } catch (error) {
        return next(error);
    }
};




const getSecureUrl = async (imageData) => {
    try {
        const { secure_url } = await cloudinary.uploader.upload(imageData, { resource_type: 'image' });
        return secure_url;
    } catch (error) {
        return error;
    }
};




//upload applicant image
const userImageUploader = async (req, res, next) => {
    try {
        const image = req.files.imageUrl; 

        if (!image) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'No image provided',
                data: null,
            });
        }

        const imgUrl = await getSecureUrl(image.data); 

        if (imgUrl instanceof Error) {
            
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Cannot upload image, try again!',
                data: null,
            });
        }

        req.imgUrl = imgUrl; 

        return next();
    } catch (error) {
        return next(error);
    }
};







//upload applicant cv document
const userCvUploader = async (req, res, next) => {

    try {

        const { cvUrl } = req.body
        console.log(cvUrl)
        const setCvUrl = await getSecureUrl(cvUrl)
        console.log(setCvUrl)
        if (!setCvUrl || setCvUrl instanceof Error) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Cannot upload cv, try again!',
                data: null,
            });
        }

        req.setCvUrl = setCvUrl

        return next();

    } catch (error) {
        return next(error);
    }
};





module.exports = {
    checkIfIdExists,
    userImageUploader,
    userCvUploader
};
