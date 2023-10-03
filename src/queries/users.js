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

const findUserById = `SELECT id, first_name, last_name, email FROM users WHERE id=$1`

const findUserByEmail = `
 SELECT id,  first_name, last_name, email, role, password FROM users WHERE email=$1
`

module.exports = {
    addUser,
    findUserByEmail,
    findUserById
}
