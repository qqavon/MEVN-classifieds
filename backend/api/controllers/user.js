const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { check } = require('express-validator/check')

module.exports = {
    //logowanie uzytkownika
    async login(req, res, next) {
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        const { password } = await User.findOne({ username: user.username }).select('password')

        if(await areSamePasswords(user.password, password)) {
            return res.status(200).json({
                message: 'Zalogowano.'
            })
        }
        else {
            return res.status(400).json({
                message: 'Nazwa użytkownika lub hasło jest niepoprawne.'
            })
        }
    },

    //rejestracja uzytkownika
    async register(req, res, next) {
        //pobieranie danych uzytkownika
        const newUser = {
            username: req.body.username,
            password: req.body.password
        }
        //hashowanie hasla
        newUser.password = await hashPassword(newUser.password)

        await new User({
            _id: mongoose.Types.ObjectId(),
            username: newUser.username,
            password: newUser.password   
        }).save()

        return res.status(200).json({
            message: 'Zarejestrowano'
        })

    }
}

//funkcja zwracajaca zahashowany ciag znakow
async function hashPassword(password) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, encryped) => {
            if(err) reject(err)
            resolve(encryped)
        })
    })
    return hashedPassword
}

async function areSamePasswords(password, encrypted) {
    return await new Promise((resolve, reject) => {
        bcrypt.compare(password, encrypted, (err, same) => {
            if(err) reject(err)
            resolve(same)
        })
    })
}

module.exports.validateLogin = [
    check('username')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Wymagana nazwa użytkownika.'),

    check('password')
        .isLength({ min: 1 })
        .withMessage('Wymagane hasło.')
]

module.exports.validateRegister = [
    check('username')
        .trim()
        .isLength({ min: 5, max: 16 })
        .withMessage("Nazwa użytkownika powinna zawierać od 5 do 16 znaków.")
    
        .isAlphanumeric()
        .withMessage("Nazwa użytkownika może zawierać tylko litery i liczby.")

        .custom(async value => await User.findOne({ username: value }) == null)
        .withMessage("Nazwa użytkownika jest zajęta."),

    check('password')
    .isLength({ min: 8, max: 15 })
    .withMessage("Hasło musi posiadać długość od 8 do 15 znaków."),
    
    check('passwordConfirmation')
        .custom((value, {req}) => value == req.body.password)
        .withMessage("Hasła muszą być takie same.")
]