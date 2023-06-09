const greenModel = require('../db/models/green')
const getImage = require('./getImage')

function parse(results) {
    const data = []
    results.forEach(doc => {
        console.log(doc)
        const filteredStatus = 
        (doc.status === "sleepy" || doc.status === "savory") ? "happy" : doc.status

        data.push({
            plant_name: doc.name,
            id: doc.id,
            profile: getImage(doc.profile),
            temperature: doc.attribute.temperature,
            wateringCycle: doc.attribute.wateringCycle,
            color: doc.color,
            memo: doc.memo,
            status: filteredStatus
        })
    });

    return data
}

module.exports = parse