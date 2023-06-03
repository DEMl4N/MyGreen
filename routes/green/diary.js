const express = require('express')
const diary = require('../../db/models/green_diary')
const upload = require("../../utilities/uploadImage")
const isValidUser = require('../../utilities/loginVaildation')
const parseDiary = require('../../utilities/parseDiary')

var router = express.Router()

router.get('/', (req, res) => {
    console.log(`${req.session.userid} requested diaries of ${req.body.id}`)

})

router.post('/', upload.single("image"), async (req, res) => {
    console.log(req.body.id, req.body.title, req.body.date, req.body.content, req.body.emotion)
    if (!req.session.userid) {
        console.log("Not loggined")
        res.status(400).send("Not loggined")
        return
    }

    await isValidUser(req.session.userid)
    .then( result => {
        if (!result) {
            console.log("Not valid login")
            res.status(401).send("Not valid login")
            return
        }
    })

    await diary.model.find({
        plant_id: req.body.id
    })
    .then(diaries => {
        const parseData = parseDiary(diaries)
        res.send(JSON.stringify(parseData))
    })
    .catch(exception => {
        console.error(exception)
        res.status(402).send("Error while finding diaries")
    })
})

module.exports = router