const Router = require('express').Router()

Router.use('/user', require('./user'))

module.exports = Router