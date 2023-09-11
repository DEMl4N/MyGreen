const user = require('../db/models/user')

async function isValidUser (userID) {
    try {
        const status = await user.model.findOne({ 
            id: userID
        })
        .exec();

        if (!status) {
            console.log("ID not found");
        }
    
        return status
    } catch (err) {
        console.error(err);
    }
}

module.exports = isValidUser