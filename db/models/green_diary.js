const db = require('../database')

const diarySchema = new db.Schema({
    plant_id: {
      type: String,
      required: true
    },
    plant_name: String,
    title: {
     type: String,
     default: ""
    },
    date: {
      type: Date,
      required: true
    },
    image: {
      type: String,
      default: ""
    },   // 일기 속 사진
    content: {
      type: String,
      default: ""
    },
    emotion: String
});

const diaryModel = db.model('diary', diarySchema)

module.exports.schema = diarySchema
module.exports.model = diaryModel