const classifiedsController = require('../controllers/classifieds')
    , Router = require('express').Router()
    , auth = require('../middlewares/auth')
    , error = require('../middlewares/error')

Router.post('/',
    auth.verifyToken,
    classifiedsController.validateClassified,
    error.checkValidation,
    classifiedsController.create)

Router.put('/:id',
    auth.verifyToken,
    classifiedsController.validateClassified,
    error.checkValidation,
    classifiedsController.update)

Router.delete('/:id',
    auth.verifyToken,
    classifiedsController.delete)

Router.get('/',
    classifiedsController.validateClassifiedSearch,
    error.checkValidation,
    classifiedsController.findAll)
    
Router.get('/:id',
    classifiedsController.findDetailed)

module.exports = Router