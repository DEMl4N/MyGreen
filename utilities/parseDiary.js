const diary = require('../db/models/green_diary')
const user = require('../db/models/user')
const getImage = require('./getImage')

async function parse(results) {
    const data = []
    results.forEach(doc => {
        console.log(doc)

        diary.model.findOne({
            writer: doc.writer
        })
        .then(userResult  => {
            data.push({
                _id: doc._id,
                plant_name: doc.plant_name,
                writer: userResult,
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