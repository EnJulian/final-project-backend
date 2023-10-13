const { addApplication, addApplicationBatch, getApplicationByTitle, getApplicationBatchById, getAllApplications, getSingleApplication, updateApplication,
    getUserUniqueApplication,getCreatedAt,getStatus,
    retrieveApplicationById
} = require('../queries/applications');
const {checkIsApplied} = require('../queries/users')
const { runQuery } = require('../config/database.config');



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

const addNewApplicationBatch = async (body) => {
    const { batch_id,
        link,
        deadline,
        instructions } = body;

    // Check if application batch already exists
    const application = await runQuery(getApplicationBatchById, [batch_id])
    if (application.length > 0) {
        throw {
            code: 409,
            status: 'error',
            message: `Application with batch Id ${batch_id} already exist`,
            data: null
        }
    }

    const result = await runQuery(addApplicationBatch, [
        batch_id,
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
    const { email, imageUrl, firstName, lastName, cvUrl, dateOfBirth, address, university, course, cgpa, user_id} = body;

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

    const result = await runQuery(addApplication, [ email, imageUrl, firstName, lastName, cvUrl, dateOfBirth, address, university, course, cgpa, "pending", user_id])
    await runQuery(checkIsApplied, [user_id])
    return {
        code: 201,
        status: 'success',
        message: 'New application added successfully',
        data: result[0]
    }
}

// const checkUserHasApplication = async (body) => {
//     const { email } = body;
//     try {
//         const result = await runQuery(getUserUniqueApplication, [email]);
//         // If a row with the user's email is found, return true; otherwise, return false
//         return !!result;
//     } catch (error) {
//         // Handle any errors that might occur during the database query
//         console.error('Error checking user application:', error);
//         return false; // You might want to return false in case of an error
//     }
// }

const getApplicationById = async (body) => {
    const { user_id } = body; 
    
    const data = await runQuery(retrieveApplicationById, [user_id]);
    console.log(data)
    return {
        code: 200,
        status: 'success',
        message: `Application found for user with id ${user_id}`,
        data
    }
    
};








const getApplicationStatus = async (id) => {
    const result = await runQuery(getStatus, [id]);
    if(result[0]){
        return {
            code: 200,
            status: 'success',
            message: 'Application Status fetched successfully',
            data: result[0]
        }
    }
}

module.exports = {

   
    retrieveAllApplications,
    retrieveSingleApplication,
    getApplicationById,
    addNewApplicationBatch,
    apply,
    getApplicationStatus
}
