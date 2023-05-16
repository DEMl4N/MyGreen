const express = require('express')
const green = require('../../db/models/green_diary')
const upload = require("../../utilities/uploadImage")

var router = express.Router()

router.get('/:plant_name', (req, res) => {
    var params = req.params;
    console.log(params);
   
   res.send(params.plant_name);
})

router.post('/', upload.single("image"), (req, res) => {
    console.log(req.body.name, req.body.title, req.body.date, req.body.content,)
    
    res.send("GOOOOD")
})

module.exports = router