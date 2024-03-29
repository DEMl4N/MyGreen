const express = require('express')
const user = require('../../db/models/user')

var router = express.Router()
router.post('/', async (req, res) => {
    if (!req.body.id || !req.body.password) { //|| !req.body.token){
        console.log("Login failed")
        return res.status(400).send("Missing id or password or token")
    }

    const login = async (id, password) => {
        try {
          const status = await user.model.findOne({ 
            id: id,
            password: password
        })
        .exec();

        if (!status) {
            console.log("ID not found");
        }
        
        return status
        } catch (err) {
            console.error(err);
            return
        }
    };

    await login(req.body.id, req.body.password)
    .then(result => {
        if (!result) {
            res.status(406).send("Not Good")
        }
    })

    await user.model.updateMany(
        { id: req.body.id },
        { $set: { deviceToken: req.body.token } }
    )
    req.session.userid = req.body.id
    console.log(`session: ${JSON.stringify(req.session)}`)
    res.send("Good")
})
module.exports = router
