const express = require('express');
const db = require('../db/database');

const router = express.Router();
const Green = require('./green');

const criteria = {
  humidity: {
    max: 80,
    min: 40,
  },
  temperature: {
    max: 30,
    min: 10,
  },
};

router.post('/', (req, res) => {
  const { id, status, humidity, temperature } = req.body;

  console.log(id, status, humidity, temperature);
  res.json({
    status: 'OK',
  });

  if (humidity > criteria.humidity.max) {
    console.log('Warning: 습도가 기준치를 초과하였습니다.');
  } else if (humidity < criteria.humidity.min) {
    console.log('Warning: 습도가 기준치 미달하였습니다.');
  }

  if (temperature > criteria.temperature.max) {
    console.log('Warning: 온도가 기준치를 초과하였습니다.');
  } else if (temperature < criteria.temperature.min) {
    console.log('Warning: 온도가 기준치 미달하였습니다.');
  }
});

module.exports = router;
