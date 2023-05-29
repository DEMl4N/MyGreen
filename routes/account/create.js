const express = require('express')
const user = require('../../db/models/user')

var router = express.Router()

router.post('/', (req, res) => {
    const { id, password, name, email, birth } = req.body;

    if(!id || !password || !name || !birth){
        res.status(400).send("There are spaces missing")
        return
    }

    user.findOne({ id: id })
    .then((foundUser) => {
        if (foundUser) { // 중복 아이디 체크
            res.status(414).send('중복된 아이디입니다.')
        } else {
            user.create({ 
                id: id, 
                password: password, 
                name: name, 
                birth: birth
            })

            console.log(id, password, name, birth, email)
            res.send("Account Created!" + id)
        }
    })
    .catch((err) => {
        res.status(500).send(err);
    });
})

    
module.exports = router
