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

module.exports = diarySchema