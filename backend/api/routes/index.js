const Router = require('express').Router()

Router.use('/user', require('./user'))
Router.use('/classifieds', require('./classifieds'))

module.exports = Router