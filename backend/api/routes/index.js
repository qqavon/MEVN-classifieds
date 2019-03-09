const Router = require('express').Router()

Router.use('/user', require('./user'))
Router.use('/classifieds', require('./classifieds'))
Router.use('/userData', require('./userData'))

module.exports = Router