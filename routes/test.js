const express = require('express');
const db = require('../db/database')
var router = express.Router()

const testSchema = new db.Schema({
	name: String,
    memo: String
});
const testModel = db.model('good', testSchema)

router.post('/', (req, res) => {
    testModel.create({
        name: req.body.name,
        memo: req.body.memo
    })

    res.send("good")
})

router.get('/', (req, res) => {
    const findDocument = async (name) => {
        try {
          const doc = await testModel.findOne({ name: name }).exec();
          if (!doc) {
            console.log("Document not found");
          }

          return doc
        } catch (err) {
          console.error(err);
        }
    };
    findDocument(req.body.name)
    .then(doc => {
        res.json(doc)
    })
})

module.exports = router