/**
 * Add new applications
 */
const addApplication = `
    INSERT INTO applications(
        email,
        image_url,
        first_name,
        last_name,
        cv_url,
        date_of_birth,
        address,
        university,
        course,
        cgpa,
        status,
        user_id
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id, created_at
`;

const addApplicationBatch = `
    INSERT INTO application_batches(
        batch_id,
        link,
        deadline,
        instructions
    ) VALUES ($1,$2,$3,$4) RETURNING id, created_at`;

const getApplicationByEmail = `
        SELECT id, first_name, last_name, date_of_birth, address, university, course, cgpa, status, created_at FROM applications WHERE email=$1
`;

const retrieveApplicationById = `
        SELECT id, first_name, last_name, email, date_of_birth, address, university, course, cgpa, status, created_at FROM applications WHERE user_id=$1
`;


const getApplicationBatchById = `
        SELECT id FROM application_batches WHERE batch_id=$1
`;

const getUserUniqueApplication = `
 SELECT id FROM applications WHERE email=$1
`;

const getAllApplications = `
        SELECT * FROM applications
`


const getSingleApplication = `
        SELECT id, first_name, last_name, date_of_birth, address, university, course, cgpa, status, created_at
        FROM applications WHERE id=$1
`

const updateApplication = `
UPDATE books 
    SET title = $2, author = $3
    WHERE id = $1
`;

  const getCreatedAt= `SELECT created_at from applications where id=$1`

  const getStatus =`SELECT status FROM applications where id=$1`
  
module.exports = {
    addApplication,
    getApplicationByEmail,
    getAllApplications,
    getSingleApplication,
    updateApplication,
    addApplicationBatch,
    getApplicationBatchById,
    getUserUniqueApplication,
    retrieveApplicationById,
    getCreatedAt,
    getStatus
}
