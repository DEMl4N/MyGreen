const db = require('../database')
const user = require('./user')

const commentSchema = new db.Schema({
    plant: {
        type: db.Types.ObjectId,
        required: true,
    },
    writer: {
        type: user.schema,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // timeline: {
    //     type: String,
    //     required: true
    // }
})

const commentModel = db.model('comment', commentSchema)

module.exports.schema =  commentSchema
module.exports.model = commentModel