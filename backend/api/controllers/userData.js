const mongoose = require('mongoose')
const UserData = require('../models/userData')
const { check } = require('express-validator/check')

module.exports = {
    async findOne(req, res, next) {
        const userData = await UserData
            .findOne({ user: req.userData._id })
            .select('phone email user')
            .populate({
                path: 'user',
                model: 'user',
                select: 'username createdAt'
            })

        return res.status(200).json({
            message: 'Dane użytkownika.',
            userData
        })
    },

    async update(req, res, next) {
        const userData = await UserData.findOne({ user: req.userData._id }).select('phone email')

        userData.phone = req.body.phone ? req.body.phone : userData.phone
        userData.email = req.body.email ? req.body.email : userData.email

        await userData.save()

        return res.status(200).json({
            message: 'Zaktualizowano dane.'
        })
    }
}

module.exports.validateUserData = [
    check('phone')
        .optional()
        .isMobilePhone()
        .withMessage('Niepoprawny numer telefonu.'),

    check('email')
        .optional()

        .isEmail()
        .withMessage('Niepoprawny adres email.')

        .isLength({ max: 30 })
        .withMessage('Adres email jest za długi. (max. 30 znaków)')
]