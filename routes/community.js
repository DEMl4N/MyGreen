const express = require('express')
const board = require('./community/board')
const reader = require('./community/read')

var router = express.Router()

router.use('/board', board)
router.use('/read', reader)

module.exports = router