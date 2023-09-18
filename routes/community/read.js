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
        console.log(diary)
        console.log(parseComment(comments))

        res.json({
            writer: diary.writer,
            title: diary.title,
            plant_name: diary.plant_name,
            content: diary.content,
            date: diary.date,
            image: getImage(diary.image),
            emotion: diary.emotion,
            comments: parseComment(comments)
        })
    })
    .catch(err => {
        res.status(401).send(err)
    })
})

router.post('/:diary_id', async (req, res) => {
    await comment.model.create({
        plant: req.params.diary_id,
        // writer: req.session.userid,
        writer: req.body.userid,
        content: req.body.content
    })
    .then(() => {
        return res.send("Comment written")
    })
    .catch(err => {
        console.log(err)
        return res.status(400).send("err while writing a comment")
    })
})

module.exports = router