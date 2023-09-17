const express = require('express')
const isValidUser = require('../../utilities/loginVaildation')
const diary = require('../../db/models/green_diary')
const parseBoardPage = require('../../utilities/parseBoardPage')

var router = express.Router()

router.get('/:page', async (req, res) => {
    if (!req.session.userid) {
        console.log("Not loggined")
        return res.status(400).send("Not loggined")
    }

    await isValidUser(req.session.userid)
    .then( result => {
        if (!result) {
            console.log("Not valid login")
            return res.status(401).send("Not valid login")
        }
    })

    if (!Number.isInteger(Number(req.params.page)) || req.params.page <= 0) {
        return res.status(402).send("page invalid")
    }

    const page = Number(req.params.page)

    const publicDiariesCount = await diary.model.countDocuments({
        isPublic: true
    })
    .exec()

    const totalPages = Math.ceil(publicDiariesCount / 10) || 1

    if (page > totalPages) {
        page = totalPages
    }

    if (page === 1) {
        let pageDiaries = await diary.model.find({
            isPublic: true
        }).limit(10)

        return res.send(JSON.stringify(parseBoardPage(pageDiaries)))
    }
    
    let latterDiaries = await diary.model.find({
        isPublic: true
    }).limit(10 * (page - 1))

    let lastIndex = latterDiaries.length - 1
    let lastID = latterDiaries[lastIndex]._id

    const pageDiaries = await diary.model.find({
        isPublic: true,
        _id: { $gt: lastID }
    }).limit(10)

    return res.send(JSON.stringify(parseBoardPage(pageDiaries)))
})

module.exports = router