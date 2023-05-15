const express = require('express');
const upload = require('../utilities/uploadImage');

var router = express.Router()

router.post('/', upload.single("image"), (req, res) => {
  console.log(req.file)
  
  res.send(`Good`)
})

module.exports = router