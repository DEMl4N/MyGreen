const diary = require('../db/models/green_diary')
const user = require('../db/models/user')
const getImage = require('./getImage')

function parse(results) {
    const data = []
    results.forEach(doc => {
        console.log(doc)

        const writer = ""

        user.model.findOne({
            _id: doc.writer
        })
        .then(userResult => {
            writer = userResult.nickname
        })
        .then(() => {
            data.push({
                _id: doc._id,
                plant_name: doc.plant_name,
                writer: writer,
                title: doc.title,
                date: doc.date,
                emotion: doc.emotion,
                content: doc.content,
                image: getImage(doc.image),
            })
        })
    });

    return data
}

module.exports = parse