const dotenv = require('dotenv')
const {verify} = require("jsonwebtoken");

dotenv.config();
const checkAuthorizationToken = (authorization) => {
    let bearerToken = null;
    if (authorization) {
        const token = authorization.split(' ')[1];
        bearerToken = token || authorization;
    }
    return bearerToken;
}

const checkToken = (req) => {
    const {
        headers: { authorization }
    } = req;
    const bearerToken = checkAuthorizationToken(authorization);
    return req.body.refreshToken
        ? req.body.refreshToken
        : bearerToken ||
        req.headers['x-access-token'] ||
        req.headers.token ||
        req.body.token;
}

const verifyToken = (token, JWT_SECRET) => {
    return verify(token, JWT_SECRET);
}
const authenticate = (req, res, next) => {
    const token = checkToken(req);
    if (!token) {
        return res.status(400).json({
            code: 404,
            status: 'error',
            message: 'bearer token is required',
            data: null
        })
    }
    try {
        req.data = verifyToken(token, process.env.JWT_SECRET_KEY);

        next();
    } catch (err) {
        return res.status(403).json({
            code: 403,
            status: 'error',
            message: 'invalid token',
            data: null
        })
    }
}


module.exports = {
    authenticate
}