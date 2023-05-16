const db = require('../database')

const attributeSchema = new db.Schema({
    optimalTemperature: {
        type: Number,   // 최적 온도: iot에서 +- 10% 로 맞추면 될 듯
        required: true
    },

    wateringCycle: {
        type: Number,   //  화분에 물주는 주기 (일)
        required: true
    }

});

module.exports = attributeSchema