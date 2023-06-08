const express = require('express');
const db = require('../db/database');
const admin = require('firebase-admin');
const serviceAccount = require('C:\\Users\\micha\\Desktop\\serviceAccountKey.json');
const app = require('../app');



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-storage-bucket.appspot.com'
});

const bucket = admin.storage().bucket();

const router = express.Router();
const Green = require('./green');

router.post('/', async (req, res) => {
  const { id, status } = req.body;

  // 예외 처리: id나 status가 누락된 경우
  if (!id || !status) {
    return res.status(400).json({ error: 'id and status are required' });
  }

  try {
    const idExists = await Green.compareId(id);
    if (idExists) {
      res.status(200).json({ message: 'ID exists in the database' });
    } else {
      res.status(200).json({ message: 'ID does not exist in the database' });
    }

    // Firebase Storage에 status 데이터 업로드
    const remoteFilePath = `status/${id}.json`;
    const fileContents = JSON.stringify({ status });

    const file = bucket.file(remoteFilePath);
    const stream = file.createWriteStream({
      metadata: {
        contentType: 'application/json'
      }
    });

    stream.on('error', (error) => {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload status data' });
    });

    stream.on('finish', () => {
      console.log('Status data uploaded successfully.');
      // res.status(200).json({ message: 'Status data uploaded successfully' });
    });

    stream.end(fileContents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to compare id' });
  }
});


module.exports = router;