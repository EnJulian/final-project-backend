const UserService = require('../services/user.service');
const ApplicationService = require("../services/application.service");

/**
 * Controller creating a new user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns JSON object as response data
 */
const createUser = async (req, res, next) => {
    try {
        const response = await UserService.createUser(req.body);
        return res.status(response.code).json(response)
    } catch (error) {
        next(error)
    }
}

/**
 * Controller for login user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const signInUser = async (req, res, next) => {
    try {
        const result = await UserService.loginUser(req.body);
        return res.status(result.code).json(result);
    } catch (error) {
        next(error)
    }
}

const fetchAllUsers = async (req, res, next) => {
    try {
        const result = await UserService.getAllUsers();
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}

const fetchUniqueApplication = async (req, res, next) => {
    try {
        const result = await UserService.getUniqueApplication();
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}



const updateAssessmentTakenStatus = async (req, res, next) => {
    try {
        const userId = req.params.id; // Extract the postId from the request parameters
        const result = await UserService.updateTestTakenStatus(userId);

        if (result.code === 404) {
            return res.status(404).json(result);
        }

        return res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
}

const updateAssessmentScore = async (req, res, next) => {
    try {
        const userId = req.params.id; // Extract the postId from the request parameters
        const result = await UserService.updateTestScores(userId);

        if (result.code === 404) {
            return res.status(404).json(result);
        }

        return res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser,
    signInUser,
    fetchAllUsers,
    updateAssessmentTakenStatus,
    updateAssessmentScore,
    fetchUniqueApplication
}
