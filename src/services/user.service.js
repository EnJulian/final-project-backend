const { addUser, findUserByEmail, findUserById, updateUserTakenStatus, updateUserTestScore, fetchAllUsers } = require('../queries/users');
const { runQuery } = require('../config/database.config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/env/index')
const {getAllApplications} = require("../queries/applications");


/**
 * Create new user
 */
const createUser = async (body) => {
    const { password, confirmPassword, firstName, lastName, email, phoneNumber } = body

    if (password !== confirmPassword) {
        return {
            code: 400,
            status: 'error',
            message: 'Passwords do not match.',
            data: null
        }
    }
    // Check if user already exist in db
    const userExist = await runQuery(findUserByEmail, [email])
    if (userExist.length > 0) {
        throw {
            code: 409,
            message: 'User already exists',
            data: null,
            status: 'error'
        }
    }

    // Encrypt password
    const saltRounds = 12;
    const hash = bcrypt.hashSync(password, saltRounds);
    const response = await runQuery(addUser, [firstName, lastName, phoneNumber, email, hash, "user"])

    return {
        code: 201,
        status: 'success',
        message: 'New user added successfully',
        data: response[0]
    }
}

const loginUser = async (body) => {
    const { email, password } = body;

    // Check if that user exists inside the db
    const user = await runQuery(findUserByEmail, [email]);
    if (user.length === 0) {
        throw {
            code: 404,
            status: 'error',
            message: 'User not found',
            data: null
        }
    }
    // Compare user passwords
    const { password: dbPassword, role, first_name, last_name, id } = user[0];
    const userPassword = bcrypt.compareSync(password, dbPassword); // Boolean true/false
    if (!userPassword) {
        throw {
            code: 400,
            status: 'error',
            message: 'Wrong email and password combination',
            data: null
        }
    }

    const options = {
        'expiresIn': '1d'
    }

    // Generate token for authentication purposes
    const token = jwt.sign({
        id,
        first_name,
        last_name,
        email,
        role
    }, config.JWT_SECRET_KEY, options);
    return {
        status: 'success',
        message: 'User login successfully',
        code: 200,
        data: {
            id,
            first_name,
            last_name,
            email,
            role,
            token
        }
    }
}

const getAllUsers = async () => {
    const data = await runQuery(fetchAllUsers);
    return {
        code: 200,
        status: 'success',
        message: 'Users fetched successfully',
        data
    }
}

const updateTestTakenStatus = async (id) => {
    const updated_at = new Date();
    const result = await runQuery(updateUserTakenStatus, [ updated_at, id]);
    if (result.rowCount === 1) {
        return {
            code: 200,
            status: 'success',
            message: 'User assessment taken status updated successfully',
        };
    } else {
        return {
            code: 404,
            status: 'error',
            message: 'User not found',
        };
    }
};
const updateTestScores = async (id) => {
    const updated_at = new Date();
    const result = await runQuery(updateUserTestScore, [ updated_at, id]);
    if (result.rowCount === 1) {
        return {
            code: 200,
            status: 'success',
            message: 'User score updated successfully',
        };
    } else {
        return {
            code: 404,
            status: 'error',
            message: 'User not found',
        };
    }
};


module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    updateTestTakenStatus,
    updateTestScores
}
