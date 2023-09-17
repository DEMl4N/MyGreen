const diary = require('../db/models/green_diary')
const user = require('../db/models/user')

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
                title: doc.title,
                writer: writer,
            })
        })
    });

    return data
}

module.exports = parse