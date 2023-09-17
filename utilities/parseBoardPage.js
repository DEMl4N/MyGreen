const diary = require('../db/models/green_diary')
const user = require('../db/models/user')

function parse(results) {
    const data = []
    results.forEach(doc => {
        console.log(doc)

        diary.model.findOne({
            writer: doc.writer
        })
        .then(userResult  => {
            data.push({
                _id: doc._id,
                title: doc.title,
                writer: userResult.nickname,
            })
        })
    });

    return data
}

module.exports = parse