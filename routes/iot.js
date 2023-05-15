const express = require('express')

var router = express.Router()

router.post('/', (req, res) => {
    console.log(req.body.lux, req.body.humidity, req.body.temperature)
    res.json({
        status: "OK"
    })
})

module.exports = router