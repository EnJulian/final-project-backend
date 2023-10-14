/**
 * Add New User
 */
const addUser = `
  INSERT INTO users(
    first_name,
    last_name,
    phone_number,
    email,
    password,
    role
  )
  VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, first_name, last_name, email, role, created_at
`;

const fetchAllUsers = `
SELECT * FROM users
`;
const fetchAdminDetails = `
SELECT first_name, last_name, email, phone_number, country, address FROM users
`;

const findUserById = `SELECT id, first_name, last_name, email, phone_number, country, address FROM users WHERE id=$1`

const findUserByEmail = `
 SELECT id,  first_name, last_name, email, role, isapplied, test_taken, test_scores, created_at, password FROM users WHERE email=$1
`;

const getUserUniqueApplication = `
        SELECT id FROM applications WHERE application_id=$1
`;

const updateAdminCreds = `
UPDATE users
SET
 first_name = $1,
 last_name = $2,
 email = $3,
 phone_number = $4,
 country = $5,
 address = $6
 
WHERE id = $7 ` ;

const checkIsApplied = `
UPDATE users
SET isapplied = true
WHERE id = $1 ` ;

const updateUserTestScore = `
UPDATE users 
SET test_scores = test_scores + 10  
WHERE id = $1 ` ;


const updateUserTakenStatus = `
UPDATE users 
SET test_taken = true
WHERE id = $1`;

module.exports = {
    updateUserTakenStatus,
    updateUserTestScore,
    addUser,
    findUserByEmail,
    findUserById,
    fetchAllUsers,
    checkIsApplied,
    fetchAdminDetails,
    updateAdminCreds,
    getUserUniqueApplication
}
