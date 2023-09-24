/**
 * Add new book
 */
const addApplication = `
    INSERT INTO applications(
        application_batch_id,
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
        status
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id, created_at
`;

const addApplicationBatch = `
    INSERT INTO application_batches(
        batch_id, 
        image_url,
        link,
        deadline,
        instructions
    ) VALUES ($1,$2,$3,$4,$5) RETURNING id, created_at`;

const getApplicationByTitle = `
        SELECT id, title, author, user_id FROM books WHERE title=$1
`;

const getApplicationBatchById = `
        SELECT id FROM application_batches WHERE batch_id=$1
`;

const getUserUniqueApplication = `
        SELECT id FROM applications WHERE email=$1 AND application_batch_id=$2
`;

const getAllApplications = `
        SELECT * FROM books
`

const getSingleApplication = `
        SELECT id, title, author, user_id, published_at, created_at
        FROM books WHERE id=$1
`

const updateApplication = `
UPDATE books 
    SET title = $2, author = $3
    WHERE id = $1
`;

module.exports = {
    addApplication,
    getApplicationByTitle,
    getAllApplications,
    getSingleApplication,
    updateApplication,
    addApplicationBatch,
    getApplicationBatchById,
    getUserUniqueApplication
}