const AssessmentService = require('../services/assessment.service');

/**
 * Controller function to add new application
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON} - A JSON response containing the applications detail
 */
const createAssessment = async (req, res, next) => {
    try {
        const result = await AssessmentService.addNewAssessment(req.body);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}

const takeAssessment = async (req, res, next) => {
    try {
        const result = await AssessmentService.takeAssessment(req.body);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}

const fetchAllAssessments = async (req, res, next) => {
    try {
        const result = await AssessmentService.getResults();
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}



module.exports = {
    createAssessment,
    takeAssessment,
    fetchAllAssessments

}
