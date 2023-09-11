const express = require('express')
const isValidUser = require('../../utilities/loginVaildation')
const diary = require('../../db/models/green_diary')

var router = express.Router()

router.get('/:page', async (req, res) => {
    if (!req.session.userid) {
        console.log("Not loggined")
        return res.status(400).send("Not loggined")
    }

    await isValidUser(req.session.userid)
    .then( result => {
        if (!result) {
            console.log("Not valid login")
            return res.status(401).send("Not valid login")
        }
    })

    if (!Number.isInteger(req.params.page) || req.params.page <= 0) {
        return res.status(402).send("page invalid")
    }

    
})

module.exports = router