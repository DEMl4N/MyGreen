const express = require('express');
const cors = require('cors')
const body_parser = require('body-parser')

const index = require('./routes/index')
const test = require('./routes/test')
const account = require('./routes/account')
const green = require('./routes/green')

const app = express();

app.use(express.json())
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())
app.use(cors())

// for Mobile Application
app.use('/', index)
app.use('/test', test)
app.use('/account', account)
app.use('/green', green)
//

// for IOT vase

// 

module.exports = app