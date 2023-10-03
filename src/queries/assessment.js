/**
 * Add new book
 */

const addAssessment = `
    INSERT INTO assessments(
        batchId, 
        imageUrl, 
        time_allocated,
        questions
    ) VALUES ($1,$2,$3,$4) RETURNING id, created_at`;


const addAssessmentResults = `
    INSERT INTO assessment_results(
        assessment_id,
        application_id,
        time_spent,
        responses
    ) VALUES ($1,$2,$3,$4) RETURNING id, created_at`;

const addAssessmentBatch = `
    INSERT INTO application_batches(
        batch_id, 
        image_url,
        link,
        deadline,
        instructions
    ) VALUES ($1,$2,$3,$4,$5) RETURNING id, created_at`;

const getAssessmentByTitle = `
        SELECT id, title, author, user_id FROM books WHERE title=$1
`;

const getAssessmentBatchById = `
        SELECT id FROM application_batches WHERE batch_id=$1
`;

const getUserUniqueAssessmentResult = `
        SELECT id FROM assessment_results WHERE assessment_id=$1 AND application_id=$2
`;

const getAllAssessments = `
        SELECT * FROM assessment_results
`

const getSingleAssessment = `
        SELECT id, title, author, user_id, published_at, created_at
        FROM books WHERE id=$1
`

const updateAssessment = `
UPDATE books 
    SET title = $2, author = $3
    WHERE id = $1
`;

module.exports = {
    addAssessmentResults,
    addAssessment,
    getAssessmentByTitle,
    getAllAssessments,
    getSingleAssessment,
    updateAssessment,
    addAssessmentBatch,
    getAssessmentBatchById,
    getUserUniqueAssessmentResult
}
