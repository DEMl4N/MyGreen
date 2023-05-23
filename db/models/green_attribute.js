const db = require('../database');

const attributeSchema = new db.Schema({
    optimalTemperature: {
        type: Number,
        required: true
    },
    wateringCycle: {
        type: Number,
        required: true
    }
});

module.exports = attributeSchema;
