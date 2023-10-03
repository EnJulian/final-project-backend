const { addAssessment, addAssessmentBatch,addAssessmentResults, getAssessmentByTitle, getAssessmentBatchById, getAllAssessments, getSingleAssessment, updateAssessment,
    getUserUniqueAssessmentResult
} = require('../queries/assessment');
const { runQuery } = require('../config/database.config');

/**
 * Add new application
 */
const addNewAssessment = async (body) => {
    const { batchId, imageUrl, questions } = body;

    const result = await runQuery(addAssessment, [batchId, imageUrl, 30, JSON.stringify(questions)])
    return {
        code: 201,
        status: 'success',
        message: 'New assessment added successfully',
        data: result[0]
    }
}

/**
 * Get all applications
 */
const retrieveAllAssessments = async () => {
    const data = await runQuery(getAllAssessments);
    return {
        code: 200,
        status: 'success',
        message: 'Assessments fetched successfully',
        data
    }
}

/**
 * Get Single Assessment
 */
const retrieveSingleAssessment = async (id) => {
    const result = await runQuery(getSingleAssessment, [id]);
    if(result[0]){
        return {
            code: 200,
            status: 'success',
            message: 'Single application fetched successfully',
            data: result[0]
        }
    }else {
        return {
            code: 404,
            status: 'failed',
            message: `no data found for id ${id}`,
            data: null
        }
    }
}

const updateSingleAssessment = async (id, body) => {
    const data = await runQuery(updateAssessment, [id, body.title, body.author]);
    return {
        code: 200,
        status: 'success',
        message: `Assessment with id ${id} updated successfully`,
        data: []
    }
}

const addNewAssessmentBatch = async (body) => {
    const { batchId, imageUrl,
        link,
        deadline,
        instructions } = body;

    // Check if application batch already exists
    const application = await runQuery(getAssessmentBatchById, [batchId])
    if (application.length > 0) {
        throw {
            code: 409,
            status: 'error',
            message: `Assessment with batch Id ${batchId} already exist`,
            data: null
        }
    }

    const result = await runQuery(addAssessmentBatch, [batchId, imageUrl,
        link,
        deadline,
        instructions])
    return {
        code: 201,
        status: 'success',
        message: 'New application added successfully',
        data: result[0]
    }
}

const takeAssessment = async (body) => {
    const { applicationId, assessmentId, timeSpent, responses } = body;

    // Check if application batch already exists
    const application = await runQuery(getUserUniqueAssessmentResult, [assessmentId, applicationId])
    if (application.length > 0) {
        throw {
            code: 409,
            status: 'error',
            message: `You have already submitted your responses.`,
            data: null
        }
    }

    const result = await runQuery(addAssessmentResults, [assessmentId, applicationId, timeSpent, JSON.stringify(responses)])
    return {
        code: 201,
        status: 'success',
        message: 'Assessment result recorded successfully',
        data: result[0]
    }
}

module.exports = {
    addNewAssessment,
    retrieveAllAssessments,
    retrieveSingleAssessment,
    updateSingleAssessment,
    addNewAssessmentBatch,
    takeAssessment
}
