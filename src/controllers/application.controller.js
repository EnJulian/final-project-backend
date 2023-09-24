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
        const result = await ApplicationService.apply(req.body);
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

const updateSingleApplication = async (req, res, next) => {
    try {
        const { id } = req.params
        const body = req.body;
        const result = await ApplicationService.updateSingleApplication(id, body);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createApplication,
    fetchAllApplications,
    fetchSingleApplication,
    updateSingleApplication,
    apply

}