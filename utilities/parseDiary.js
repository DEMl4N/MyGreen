const diary = require('../db/models/green_diary')
const getImage = require('./getImage')

function parse(results) {
    const data = []
    results.forEach(doc => {
        console.log(doc)
        data.push({
            plant_name: doc.plant_name,
            title: doc.title,
            date: doc.date,
            emotion: doc.emotion,
            content: doc.content,
            image: getImage(doc.image),
        })
    });

    return data
}

module.exports = parse