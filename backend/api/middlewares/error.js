exports.notFound = (req, res, next) => {
    const err = new Error('Not found')
    err.status = 404

    next(err)
}

exports.catchError = (err, req, res, next) => {
    err.status = err.status || 500

    return res.status(err.status).json({
        message: err.message
    })
}