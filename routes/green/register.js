const express = require('express')
const unregistered = require('../../db/models/unregistered_green')

var router = express.Router()

async function isRegisterable(greenID) {
    res = await unregistered.findOne({
        id: greenID
    })

    console.log(res)
    return res
}

async function deleteUnregistered(greenID) {
    unregistered.deleteOne({
        id: greenID
    })
}

router.get('/:greenHash', (req, res) => {
    isRegisterable(req.params.greenHash)
    .then(result => {
        if (result) {
            //deleteUnregistered(req.params.greenHash)
            res.json({
                status: "OK",
                id: req.params.greenHash
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
            })
        }
    })
})

module.exports = router