const express = require('express')
const attributeSchema = require('../db/models/green_attribute')
const db = require('../db/database')

const router = express.Router()
const Attribute = db.model('Attribute', attributeSchema)

router.post('/', (req, res) => {
  console.log(req.body.lux, req.body.humidity, req.body.temperature)
  res.json({
    status: "OK"
  })
})

router.get('/', async (req, res) => {
  try {
    const attributes = await Attribute.findOne({})
    const { optimalTemperature, wateringCycle } = attributes
    res.json({ optimalTemperature, wateringCycle })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
