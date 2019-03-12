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
        let classifiedsCount = await Classifieds.countDocuments({})
        let findQuery = {}
        let sortObj = {}
        let docsPerPage = 10

        let page = req.query.page
        if(page <= 0) page = 1

        let skipDocs = page * docsPerPage - docsPerPage
        let numOfPages = Math.ceil(classifiedsCount / docsPerPage)

        //Na janusza bo nie mam pomysłu SORTOWANE
        if   (!req.query.sort_by) sortObj['name'] = 1
        else sortObj[req.sortBy.query] = req.sortBy.sort
        //Dane do pobrania (nazwa, województwo, kategoria)
        if(req.query.q) findQuery['name'] = new RegExp(`.*${req.query.q}.*`)
        if(req.query.voivodeship > 0) findQuery['voivodeship'] = +req.query.voivodeship
        if(+req.query.category > 0) findQuery['category'] = +req.query.category

        const classifieds = await Classifieds
            .find(findQuery)
            .skip(skipDocs)
            .limit(docsPerPage)
            .select('user name category createdAt voivodeship')
            .sort(sortObj)
            .populate({
                path: 'user',
                select: 'username'
            })
        
        

        return res.status(200).json({
            message: 'Wszystkie ogłoszenia.',
            numOfPages,
            classifieds
        })
    },

    async findDetailed(req, res, next) {
        const classified = await Classifieds
            .findOne({ _id: req.params.id })
            .populate({
                path: 'user',
                select: 'username'
            })

        return res.status(200).json({
            message: 'Wybrane szczegółowe ogłoszenie.',
            classified
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
        .isLength({ max: 2000 })
        .withMessage('Opis jest za długi. (max. 2000 znaków)'),

    check('voivodeship')
        .custom(value => (typeof value !== "number" || value > 16 || value < 0) ? false : true)
        .withMessage('Niepoprawne dane z województwem.'),

    check('category')
        .custom(value => (typeof value !== "number" || value > 12 || value < 0) ? false : true)
        .withMessage('Niepoprawne dane z kategorią.')
]

module.exports.validateClassifiedSearch = [
    check('category')
        .optional()
        .custom(value => (value > 12 || value < 0) ? false : true)
        .withMessage('Niepoprawne dane z kategorią.'),
    
    check('voivodeship')
        .optional()
        .custom(value => (value > 16 || value < 0) ? false : true)
        .withMessage('Niepoprawne dane z województwem.'),
    
    check('q')
        .optional()
        .isLength({ max: 80 })
        .withMessage('Nazwa jest za długa. (max. 80 znaków)'),

    check('page')
        .optional()
        .isNumeric()
        .withMessage('Podana strona nie jest numeryczna'),

    check('sort_by')
        .optional()
        .custom((value, {req}) => {
            if(value.includes('_')) {
                let query = value.split('_')
                let sort = query.pop()
                query = query.join(" ")

                switch(sort) {
                    case 'asc':
                        sort = 1
                        break
                    case 'desc':
                        sort = -1
                        break
                    default:
                        sort = 1
                }

                req.sortBy = {
                    query,
                    sort
                }
            }
            else {
                req.sortBy = {
                    query: "name",
                    sort: 1
                }
            }
            return true
        })
]