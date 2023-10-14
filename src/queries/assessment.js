/**
 * Add new book
 */

const addAssessment = `
    INSERT INTO assessments(
        application_batch_id,
        time_allocated,
        questions
    ) VALUES ($1,$2,$3) RETURNING id, created_at`;


const addAssessmentResults = `
    INSERT INTO assessment_results(
        user_id,
        assessment_id,
        application_id,
        time_allocated,
        time_spent,
        responses
    ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, created_at`;

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
        SELECT a.*, u.test_taken, u.test_scores
    from applications a 
    inner join users u ON u.id=a.user_id
           WHERE u.test_taken = true
`

const addTimer = `
  INSERT INTO assessments(
    time_allocated
  )
  VALUES ($1) RETURNING id,created_at
`;

const updateTimer=`
UPDATE assessments 
SET time_allocated =$1
WHERE id = $2
RETURNING id,time_allocated,updated_at
`



module.exports = {
    addAssessmentResults,
    addAssessment,
    getAssessmentByTitle,
    getAllAssessments,
    addAssessmentBatch,
    updateTimer,
    addTimer,
    getAssessmentBatchById,
    getUserUniqueAssessmentResult
}
