const validApplicant = (req, res, next) => {
    if (req.data && req.data.role !== 'user') {
        return res.status(403).json({
            code: 403,
            status: 'error',
            message: 'You do not have enough permission to access this web resource',
            data: null
        })
    }
    next();
}

const validAdmin = (req, res, next) => {
    console.log("data check", req.data)
    if (req.data && req.data.role !== 'super_admin') {
        
        return res.status(403).json({
            code: 403,
            status: 'error',
            message: 'You do not have enough permission to access this web resource',
            data: null
        })
    }
    next();
}


 module.exports = {
     validApplicant,
     validAdmin
 }
