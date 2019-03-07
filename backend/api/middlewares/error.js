const { validationResult } = require('express-validator/check')

exports.notFound = (req, res, next) => {
    const err = new Error('Not found')
    err.status = 404

    next(err)
}

exports.catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err))
    }
}

exports.catchError = (err, req, res, next) => {
    err.status = err.status || 500

    return res.status(err.status).json({
        message: err.message
    })
}

module.exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            validated: req.body,
            errors: errors.array().map(err => err.msg)
        })
    }

    next()
}