const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const UserData = require('../models/userData')
const { check } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../constants.json')

module.exports = {
    //logowanie uzytkownika
    async login(req, res, next) {
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        const userData = await User.findOne({ username: user.username }).select('username password')
        if(!userData)
            return res.status(400).json({
                errors: ['Nazwa użytkownika lub hasło jest niepoprawne.']
            })
        
        if(await areSamePasswords(user.password, userData.password)) {
            const token = await jwt.sign(
                {
                    _id: userData._id,
                    username: userData.username
                },
                JWT_SECRET,
                {
                    expiresIn: 600 //10 min (testowy czas)
                }
            )

            return res.status(200).json({
                message: 'Zalogowano.',
                token
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

        const user = await new User({
            _id: mongoose.Types.ObjectId(),
            username: newUser.username,
            password: newUser.password   
        }).save()

        await new UserData({
            _id: mongoose.Types.ObjectId(),
            user: user._id
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
        .withMessage("Nazwa użytkownika może zawierać tylko litery i/lub liczby.")

        .custom(async value => await User.findOne({ username: value }) == null)
        .withMessage("Nazwa użytkownika jest zajęta."),

    check('password')
    .isLength({ min: 8, max: 15 })
    .withMessage("Hasło musi posiadać długość od 8 do 15 znaków."),
    
    check('passwordConfirmation')
        .custom((value, {req}) => value == req.body.password)
        .withMessage("Hasła muszą być takie same.")
]