const diary = require('../db/models/green_diary')
const user = require('../db/models/user')
const getImage = require('./getImage')

async function parse(results) {
    const data = []
    for (const doc of results) {
        await user.model.findOne({
            id: doc.writer
        })
        .then(userResult => {
            data.push({
                _id: doc._id,
                title: doc.title,
                writer: userResult.nickname,
                date: doc.date,
                content: doc.content,
                image: getImage(doc.image)
            })
        })
    }

    console.log(data)
    return data
}

module.exports = parse