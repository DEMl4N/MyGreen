const express = require('express');
const unregistered = require("../db/models/unregistered_green")

var router = express.Router()

router.post('/', (req, res) => {
  console.log(req.body.unregistered)
  unregistered.create({
    id: req.body.unregistered
  })
  .catch(exception => {
    return res.status(400).send("Not Good")
  })
  res.send(`Good`)
})

module.exports = router