const express = require('express');
const db = require('../db/database');
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount/serviceAccountKey.json');
const app = require('../app');
const router = express.Router();
const greenModel = require('../db/models/green');
const userModel = require('../db/models/user')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

router.post('/', async (req, res) => {
  const { id, status } = req.body;

  // 예외 처리: id나 status가 누락된 경우
  if (!id || !status) {
    return res.status(400).json({ error: 'id and status are required' });
  }

  console.log(`${req.body.id}, ${req.body.status}`)

  try {
    const greenDoc = await greenModel.findOne({
      id: id
    });

    await greenModel.updateMany(
      { id: id },
      { $set: { status: status } }
    )

    if (status === "happy" || status === "sleepy") {
      return res.json({
        status: "OK"
      })
    }

    const userDoc = await userModel.findOne({
      id: greenDoc.userID
    })

    const token = userDoc.deviceToken

    let message = {
      notification: {
        title: `Mygreen`,
        body: `${greenDoc.name} is ${status} now!`,
      },
      token: token
    }

    admin.messaging()
    .send(message)
    .then(response => {
      console.log("GOOoOOD")
    })
    .catch(err => {
      console.err(err)
    })

    return res.json({
      status: "OK"
    })

  } catch (error) {
    console.log("IOIII")
    return res.status(400).send("T.T")
  }
});

router.get('/', async (req, res) => {
    const greenDoc = await greenModel.findOne({
      id: req.body.id
    })

    res.json({
      temperature: greenDoc.temperature,
      wateringCycle: greenDoc.wateringCycle
    })
})

module.exports = router;