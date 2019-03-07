const Router = require('express').Router()
const userController = require('../controllers/user')
const error = require('../middlewares/error')

Router.post('/login',
    userController.validateLogin,
    error.checkValidation,
    error.catchAsync(userController.login))

Router.post('/register',
    userController.validateRegister,
    error.checkValidation,
    error.catchAsync(userController.register))
    
Router.delete('/')

module.exports = Router