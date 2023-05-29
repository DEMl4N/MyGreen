const db = require("../database")

const unregisteredSchema = new db.Schema({
    id: {
        type: String,
        required: true
    }
})

const unregistered = db.model('unregistered', unregisteredSchema)

module.exports = unregistered