const express = require('express')
const isValidUser = require('../../utilities/loginVaildation')
const diary = require('../../db/models/green_diary')
const getImage = require('../../utilities/getImage')
const parseComment = require('../../utilities/parseComment')
const comment = require('../../db/models/comment')

var router = express.Router()
router.get('/:diary_id', async (req, res) => {
    const comments = await comment.model.find({
        plant: req.params.diary_id
    })

    await diary.model.findOne({
        _id: req.params.diary_id
    })
    .then(diary => {
        res.json({
            writer: diary.writer,
            plant_name: diary.plant_name,
            content: diary.content,
            image: getImage(diary.image),
            emotion: diary.emotion,
            comments: parseComment(comments)
        })
    })
    .catch(err => {
        res.status(401).send("err while requesting a diary")
    })
})

router.post('/:diary_id', async (req, res) => {
    await comment.model.create({
        plant: req.params.diary_id,
        writer: req.session.userid,
        content: req.body.content
    })
    .catch(err => {
        res.status(400).send("err while writing a comment")
    })

    res.send("Comment written")
})

module.exports = router