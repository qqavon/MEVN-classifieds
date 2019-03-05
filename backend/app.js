const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , mongoose = require('mongoose')
    , error = require('./api/middlewares/error')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', require('./api/routes/index'))

app.use(error.notFound)
app.use(error.catchError)

module.exports = app