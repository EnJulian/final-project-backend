const ApplicationService = require('../services/application.service');

/**
 * Controller function to add new application
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON} - A JSON response containing the applications detail
 */
const createApplication = async (req, res, next) => {
    try {
        const result = await ApplicationService.addNewApplicationBatch(req.body);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}

const apply = async (req, res, next) => {
    try {
        const imageUrl = req.imgUrl
        const cvUrl = req.setCvUrl
         console.log(imageUrl, cvUrl)
        const result = await ApplicationService.apply({...req.body, imageUrl, cvUrl});
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}
const fetchAllApplications = async (req, res, next) => {
    try {
        const result = await ApplicationService.retrieveAllApplications();
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}




const fetchSingleApplication = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await ApplicationService.retrieveSingleApplication(id);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}

// const updateSingleApplication = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const body = req.body;
//         const result = await ApplicationService.updateSingleApplication(id, body);
//         return res.status(result.code).json(result)
//     } catch (error) {
//         next(error)
//     }
// }


//upload applicant image src to database
// const storeUserImage = async (req, res, next) => {
//     try {
//         const imageUrl = req.imgUrl
//
//         await ApplicationService.apply({...req.body, imageUrl});
//
//         //const result = await applicantService.setApplicantImageDb( imageUrl, email);
//
//         // return res.status(result.code).json(result);
//         return next();
//     } catch (error) {
//         next(error);
//     }
// };
//
//
//
//
//
// //Upload doc url to database
// const storeUserDocument = async (req, res, next) => {
//     try {
//
//         const {  email } = req.body;
//
//         const cvUrl = req.cvUrl
//
//
//         await ApplicationService.apply( cvUrl, email);
//
//         return next();
//
//         //return res.status(result.code).json(result);
//     } catch (error) {
//         next(error);
//     }
// };

module.exports = {
    createApplication,
    fetchAllApplications,
    fetchSingleApplication,
    // updateSingleApplication,
    // insertApplicationBatch,
    apply,
    // storeUserImage,
    // storeUserDocument

}