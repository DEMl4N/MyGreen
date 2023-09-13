const express = require('express')
const user = require('../../db/models/user')

var router = express.Router()

router.post('/', (req, res) => {
    const { id, password, email, birth, nickname } = req.body;

    if(!id || !password || !nickname) {
        res.status(400).send("There are spaces missing")
        return
    }

    user.model.findOne({ id: id })
    .then((foundUser) => {
        if (foundUser) { // 중복 아이디 체크
            return res.status(414).send('중복된 아이디입니다.')
        }
    })
    .catch((err) => {
        res.status(500).send(err);
    });

    user.model.findOne({ nickname: nickname })
    .then((existsNickname) => {
        if (existsNickname) {
            return res.status(444).send('중복된 닉네임입니다.')
        }
    })
    .catch((err) => {
        res.status(501).send(err);
    });
    
    user.model.create({ 
        id: id, 
        password: password, 
        nickname: nickname
    })
    .catch((err) => {
        res.status(502).send(err);
    });

    console.log(id, password, nickname)
    res.send("Account Created!" + id)
})

module.exports = router
