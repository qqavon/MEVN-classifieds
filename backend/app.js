const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , mongoose = require('mongoose')
    , error = require('./api/middlewares/error')
    , { DB_NAME, USER_NAME, PASSWORD, CLUSTER } = require('./constants.json')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@${CLUSTER}.mongodb.net/${DB_NAME}`, {
    useNewUrlParser: true
})
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected')
})
mongoose.connection.on('error', (err) => {
    console.log(`Error with MongoDB\n ${err}`)
})
mongoose.connection.on('disconnected', () => {
    console.log(`MongoDB disconnected`)
})

app.use('/api', require('./api/routes/index'))

app.use(error.notFound)
app.use(error.catchError)

module.exports = app