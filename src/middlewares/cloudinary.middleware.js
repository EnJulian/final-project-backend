const { runQuery } = require('../config/database.config');
const { findUserById } = require('../queries/users');

//const { setApplicantImageDb, setApplicantDocDb } = require('../services/applicant.service')

const cloudinary = require("cloudinary");
const {files} = require("express/lib/request");
const config = require("../config/env");


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




const getSecureUrl = async (fileData) => {
    try {
        cloudinary.config({
            cloud_name: config.CLOUDINARY_CLOUD_NAME,
            api_key: config.CLOUDINARY_API_KEY,
            api_secret: config.CLOUDINARY_SECRET_KEY
        });
        return new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                if (error) {
                    reject({
                        isSuccess: false,
                        message: error.message,
                        data: null
                    });
                } else {
                    resolve({
                        isSuccess: true,
                        message: "File uploaded successfully",
                        data: result.secure_url
                    });
                }
            }).end(fileData);
        });
    } catch (error) {
        return {
            isSuccess: false,
            message: error.message,
            data: null
        };
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

        const uploadResponse = await getSecureUrl(image.data); 

        if (!uploadResponse.isSuccess) {
            
            return res.status(424).json({
                status: 'failed',
                code: 424,
                message: uploadResponse.message,
                data: null,
            });
        }

        req.body.imageUrl = uploadResponse.data; 

        return next();
    } catch (error) {
        return next(error);
    }
};







//upload applicant cv document
const userCvUploader = async (req, res, next) => {

    try {

        const cvUrl = req.files.cvUrl;
        
        if (!cvUrl) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'No cv provided',
                data: null,
            });
        }
        
        const uploadResponse = await getSecureUrl(cvUrl.data);

        if (!uploadResponse.isSuccess) {

            return res.status(424).json({
                status: 'failed',
                code: 424,
                message: uploadResponse.message,
                data: null,
            });
        }
        
        req.body.cvUrl = uploadResponse.data

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
