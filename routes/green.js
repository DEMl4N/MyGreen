const express = require('express')
const greenModel = require('../db/models/green')
const isValidUser = require('../utilities/loginVaildation')
const upload = require('../utilities/uploadImage')

const diary = require("./green/diary")
const memo = require("./green/memo")
var router = express.Router()

router.use('/diary', diary)
router.use('/memo', memo)

router.post('/', upload.single("profile"), (req, res) => {
    console.log(req.session.userid, req.body.plant_name, req.file, req.body.attribute)

    if (!req.session.userid) {  // 세션이 없으면
        res.status(406).send("Unauthorized")
    }
    else if(false) { //!req.body.session || !req.body.plant_name || !req.body.profile || !req.body.attribute){   잠시 비활성화
        res.status(406).send("There are spaces missing")
    }
    else {
        isValidUser(req.session.userid)
        .then(isVaild => {
            if (!isVaild) {
                console.log(`${req.session.userid} not found`)
                res.status(407).send("No ID")
                return
            }
            try {
                greenModel.create({
                    userID: req.session.userid,
                    name: req.body.plant_name,
                    profile: req.file.filename,
                    attribute: req.body.attribute
                })

                res.send("Green Created!")
            }
            catch (err) {
                console.log(err)
                res.status(408).send("Cannot Register New Green")
            }
        })
    }
})

router.get('/', (req, res) => {
    console.log(req.session.userid)

    if (!req.session.userid) { // 세션이 없으면
        console.log("Not Loginned")
        res.status(406).send("Unauthorized")
    }

    else {
        isValidUser(req.session.userid)
        .then(isValid => {
            if (!isValid) {
                console.log(`${req.session.userid} not found`)
                res.status(407).send("No ID")
                return
            }
            greenModel.find({
                userID: req.session.userid
            })
            //.sort({ name: 1 })
            .then((greens) => {
                console.log(greens)
                res.send(greens) 
            })
            .catch(err => {
                console.error(err)
                res.status(408).send("Cannot Find Your Greens")
            })
        })
    }
})

module.exports = router
