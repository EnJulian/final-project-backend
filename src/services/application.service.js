const { addApplication, addApplicationBatch, getApplicationByTitle, getApplicationBatchById, getAllApplications, getSingleApplication, updateApplication,
    getUserUniqueApplication
} = require('../queries/applications');
const { runQuery } = require('../config/database.config');

/**
 * Add new application
 */
// const addNewApplication = async (body) => {
//     const { email, imageUrl, firstName, lastName, cvUrl, dateOfBirth, address, university, course, cgpa } = body; 
//
//     // Check if application already exists
//     const application = await runQuery(getApplicationByTitle, [title])
//     if (application.length > 0) {
//         throw {
//             code: 409,
//             status: 'error',
//             message: 'Application already exist',
//             data: null
//         }
//     }
//
//     const created_at = new Date();
//     const result = await runQuery(addApplication, [email, imageUrl, firstName, lastName, cvUrl, dateOfBirth, address, university, course, cgpa, created_at, "pending"])
//     return {
//         code: 201,
//         status: 'success',
//         message: 'New application added successfully',
//         data: result[0]
//     }
// }

/**
 * Get all applications
 */
const retrieveAllApplications = async () => {
    const data = await runQuery(getAllApplications);
    return {
        code: 200,
        status: 'success',
        message: 'Applications fetched successfully',
        data
    }
}

/**
 * Get Single Application
 */
const retrieveSingleApplication = async (id) => {
    const result = await runQuery(getSingleApplication, [id]);
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

// const updateSingleApplication = async (id, body) => {
//     const data = await runQuery(updateApplication, [id, body.title, body.author]);
//     return {
//         code: 200,
//         status: 'success',
//         message: `Application with id ${id} updated successfully`,
//         data: []
//     }
// }

const addNewApplicationBatch = async (body) => {
    const { batchId, imageUrl,
        link,
        deadline,
        instructions } = body;

    // Check if application batch already exists
    const application = await runQuery(getApplicationBatchById, [batchId])
    if (application.length > 0) {
        throw {
            code: 409,
            status: 'error',
            message: `Application with batch Id ${batchId} already exist`,
            data: null
        }
    }

    const result = await runQuery(addApplicationBatch, [batchId, imageUrl,
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

const apply = async (body) => {
    const { email, imageUrl, firstName, lastName, cvUrl, dateOfBirth, address, university, course, cgpa } = body;

    // Check if application batch already exists
    const application = await runQuery(getUserUniqueApplication, [email])
    if (application.length > 0) {
        throw {
            code: 409,
            status: 'error',
            message: `You have already applied.`,
            data: null
        }
    }

    const result = await runQuery(addApplication, [ email, imageUrl, firstName, lastName, cvUrl, dateOfBirth, address, university, course, cgpa, "pending"])
    return {
        code: 201,
        status: 'success',
        message: 'New application added successfully',
        data: result[0]
    }
}

module.exports = {
    // addNewApplication,
    retrieveAllApplications,
    retrieveSingleApplication,
    // updateSingleApplication,
    addNewApplicationBatch,
    apply
}
