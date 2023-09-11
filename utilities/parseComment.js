const comment = require('../db/models/comment')

function parse(diary_id) {
    const data = []
    results.forEach(doc => {
        console.log(doc)
        data.push({
            writer: doc.writer,
            content: doc.content,
        })
    });

    return data
}

module.exports = parse