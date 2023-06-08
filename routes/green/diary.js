const express = require('express')
const diary = require('../../db/models/green_diary')
const upload = require("../../utilities/uploadImage")
const isValidUser = require('../../utilities/loginVaildation')
const parseDiary = require('../../utilities/parseDiary')

var router = express.Router()

router.get('/:id', async (req, res) => {
    console.log(`${req.session.userid} requested diaries of ${req.params.id}`)
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

    if (!req.params.id) {
        return res.status(403).send("No ID received")
    }

    await diary.model.find({
        plant_id: req.params.id
    })
    .then(diaries => {
        const parseData = parseDiary(diaries)
        return res.send(JSON.stringify(parseData))
    })
    .catch(exception => {
        console.error(exception)
        return res.status(402).send("Error while finding diaries")
    })
})

router.post('/', upload.single("image"), async (req, res) => {
    console.log(req.body.id, req.body.title, req.body.date, req.body.content, req.body.emotion)
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

    if (!req.body.id || !req.body.title || !req.body.date || !req.body.content || !req.body.emotion) {
        return res.status(400).send("Something's Missing")
    }

    filename = (req.file === undefined) ? "" : req.file.filename

    diary.model.create({
        plant_id: req.body.id,
        plant_name: req.body.plant_name,
        title: req.body.title,
        date: req.body.date,
        content: req.body.content,
        emotion: req.body.emotion,
        image: filename
    })
    .then(result => {
        return res.send("Good")
    })
    .catch(exception => {
        console.error(exception)
        return res.status(405).send("Error occured while writing diary")
    })
})

router.delete('/', async (req, res) => {
    cosnole.log(`${req.session.userid}`)

    if (!req.session.userid) {
        console.log("Not loginned")
        return res.status(406).send("Not Loginned")
    }

    isValidUser(req.session.userid)
    .then(isValid => {
        if (!isValid) {
            console.log(`${req.session.userid} not found`)
            return res.status(407).send("Not valid User")
        }
    })
    
    await diary.model.deleteMany({
        id: req.body.id,
        date: req.body.date
    })
    .catch(exception => {
        return res.status(400).send("Error while deleting")
    })

    return res.json({
        status: "OK"
    })
})

module.exports = router