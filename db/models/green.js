const db = require('../database')
const diary = require('./green_diary')

// required: true 인 필드는 필수 필드임. 값 없이 도큐먼트를 만들면 ValidationError를 throw함.
const greenSchema = new db.Schema({
  userID: String,
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  profile: String,  // uploads/ 에 저장된 파일명
  memo: {
    type: String,
    default: ""
  },
  diary: [diary.schema],
  attribute: {
    type: db.Schema.Types.Mixed,
    required: true
  },
  color: String,
  status: {
    type: String,
    default: "happy"
  }
});

const green = db.model('green', greenSchema)

module.exports = green