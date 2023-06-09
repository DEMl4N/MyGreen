const express = require('express');
const session = require('express-session')
const index = require('./routes/index')
const test = require('./routes/test')
const account = require('./routes/account')
const green = require('./routes/green')
const iot = require('./routes/iot');

const app = express();

//app.use('/firebase', firebaseRouter);
app.use(express.json({ limit: "200mb" }))        // 413 에러 해결
app.use(express.urlencoded({ limit: "200mb", extended: true }))  // 413 에러 해결
app.use(session({
    secret: 'my-secret-key',    // 보안키 노출되면 안됨
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000
    }    // use HTTPS in production
}))

// for Mobile Application
app.use('/', index)
app.use('/account', account)
app.use('/green', green)
//

// for IOT vase
app.use('/iot', iot)
// 

// test
app.use('/test', test)

module.exports = app