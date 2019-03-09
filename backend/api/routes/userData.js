const userDataController = require('../controllers/userData')
const Router = require('express').Router()
const error = require('../middlewares/error')
const auth = require('../middlewares/auth')

Router.get('/',
    auth.verifyToken,
    userDataController.findOne)

Router.put('/',
    auth.verifyToken,
    userDataController.validateUserData,
    error.checkValidation,
    userDataController.update)

module.exports = Router