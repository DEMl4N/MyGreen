const db = require('../database')

const userSchema = new db.Schema({
    id: String,
    password: String,
    name: String,
    birth: String,
    deviceToken: String,
    nickname: String
});

const userModel = db.model('user', userSchema)

module.exports.schema = userSchema
module.exports.model = userModel