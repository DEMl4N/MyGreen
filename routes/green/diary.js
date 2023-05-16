const express = require('express')
const diary = require('../../db/models/green_diary')
const upload = require("../../utilities/uploadImage")

var router = express.Router()

router.get('/', (req, res) => {
    
})

router.post('/', upload.single("image"), (req, res) => {
    console.log(req.body.name, req.body.title, req.body.date, req.body.content)
    
    res.send("GOOOOD")
})

module.exports = router