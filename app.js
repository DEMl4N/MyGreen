const express = require('express');

const index = require('./routes/index')
const test = require('./routes/test')
const account = require('./routes/account')
const green = require('./routes/green')

const app = express();

app.use(express.json())

// for Mobile Application
app.use('/', index)
app.use('/test', test)
app.use('/account', account)
app.use('/green', green)
//

// for IOT vase

// 

module.exports = app