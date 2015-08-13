import express = require('express')
import path = require('path')
import { Services } from './services/services'

var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'static')))

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', require('./routes/index'))
app.use('/transactions', require('./routes/transactions'))

Services.initialize("apiIdentifier", "apiSecretKey", "merchantIdentifier", "merchantSecretKey")

module.exports = app
