const Classifieds = require('../models/classifieds')
    , mongoose = require('mongoose')
    , { check, oneOf } = require('express-validator/check')

module.exports = {
    async create(req, res, next) {
        await Classifieds({
            _id: mongoose.Types.ObjectId(),
            user: req.userData._id,
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            voivodeship: req.body.voivodeship
        }).save()

        return res.status(200).json({
            message: 'Dodano ogłoszenie.'
        })
    },

    async update(req, res, next) {
        const classified = await Classifieds.findOne({ user: req.userData._id, _id: req.params.id })
        if(!classified)
            return res.status(400).json({
                message: 'Ogłoszenie nie istnieje.'
            })
        
        classified.category = req.body.category
        classified.name = req.body.name
        classified.description = req.body.description
        classified.voivodeship = req.body.voivodeship

        await classified.save()

        return res.status(200).json({
            message: 'Updated'
        })
    },

    async delete(req, res, next) {
        const classified = await Classifieds.findOneAndDelete({ user: req.userData._id, _id: req.params.id })
        if(!classified)
            return res.status(200).json({
                message: 'Ogłoszenie nie istnieje.'
            })

        return res.status(200).json({
            message: 'Usunięto nie istnieje.'
        })
    },

    async findAll(req, res, next) {
        const classifieds = await Classifieds.find()

        return res.status(200).json({
            message: 'Wszystkie ogłoszenia.',
            classifieds
        })
    },

    async findChosen(req, res, next) {
        const regExpName = new RegExp(`.*${req.params.name}.*`)
        const classifieds = await Classifieds.find({category: req.params.category, name: regExpName})
        return res.status(200).json({
            message: 'Wybrane ogłoszenia.',
            classifieds
        })
    },

    async findDetailed(req, res, next) {
        return res.status(200).json({
            message: 'Wybrane szczegółowe ogłoszenie.'
        })
    }
}

module.exports.validateClassified = [
    check('name')
        .trim()
        .not().isEmpty()
        .withMessage('Nazwa jest wymagana.')

        .trim()
        .isLength({ max: 80 })
        .withMessage('Nazwa jest za długa. (max. 80 znaków)'),

    check('description')
        .trim()
        .not().isEmpty()
        .withMessage('Opis jest wymagany.')

        .trim()
        .isLength({ max: 500 })
        .withMessage('Opis jest za długi. (max. 500 znaków)'),

    check('voivodeship')
        .custom(value => (typeof value !== "number" || value > 16 || value < 0) ? false : true)
        .withMessage('Niepoprawne dane z województwem.'),

    check('category')
        .custom(value => (typeof value !== "number" || value > 11 || value < 0) ? false : true)
        .withMessage('Niepoprawne dane z kategorią.')
]

module.exports.validateClassifiedChosen = [
    check('category')
        .custom(value => (value > 11 || value < 0) ? false : true)
        .withMessage('Niepoprawne dane z kategorią.'),

    check('name')
        .trim()
        .not().isEmpty()
        .withMessage('Nazwa jest wymagana.')

        .trim()
        .isLength({ max: 500 })
        .withMessage('Nazwa jest za długa. (max. 80 znaków)'),
]