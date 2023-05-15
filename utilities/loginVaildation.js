const userModel = require('../db/models/user')

async function isValidUser (userID) {
    try {
        const status = await userModel.findOne({ 
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