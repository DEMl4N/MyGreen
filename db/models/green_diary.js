const db = require('../database')
const comment = require('./comment')
const user = require('./user')

const diarySchema = new db.Schema({
    plant_id: {
      type: String,
      required: true
    },
    writer: {   // userID
      type: String,
      required: true
    },
    plant_name: String,
    title: {
     type: String,
     default: ""
    },
    date: {
      type: String,
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
    emotion: String,
    isPublic: {
      type: Boolean,
      default: true
    },
    numberOfComments: {
      type: Number,
      default: 0
    }
});

const diaryModel = db.model('diary', diarySchema)

module.exports.schema = diarySchema
module.exports.model = diaryModel