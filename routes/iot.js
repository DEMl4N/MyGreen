const express = require('express')
const db = require('../db/database')

const router = express.Router()
const Green = require('./green')

router.post('/', (req, res) => {
  console.log(req.body.lux, req.body.humidity, req.body.temperature)
  res.json({
    status: "OK"
  })
})

// 사용자를 구별하기 위해 userID를 전달받습니다.
async function getUserByUserID(userID) {
  try {
    // green 모델을 사용하여 userID를 기준으로 사용자를 검색합니다.
    const user = await Green.findOne({ userID }).exec()
    return user
  } catch (error) {
    throw new Error('검색 중 오류가 발생했습니다: ' + error)
  }
}
const userID = 'exampleUserID'

getUserByUserID(userID)
  .then(user => {
    if (user) {
      console.log('사용자를 찾았습니다:', user)
    } else {
      console.log('사용자를 찾을 수 없습니다.')
    }
  })
  .catch(error => {
    console.error(error)
  })


module.exports = router
