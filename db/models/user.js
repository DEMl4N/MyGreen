const db = require('../database')

const userSchema = new db.Schema({
    id: String,
    password: String,
    name: String,
    birth: String
});

const user = db.model('user', userSchema)

module.exports = user