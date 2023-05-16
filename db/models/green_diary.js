const db = require('../database')

const diarySchema = new db.Schema({
    date: {
      type: Date,
      required: true
    },
    image: String,   // 일기 속 사진
    content: {
        type: String,
        required: true
    },
    emotion: Number
});

const diaryModel = db.model('diary', diarySchema)

module.exports.schema = diarySchema
module.exports.model = diaryModel