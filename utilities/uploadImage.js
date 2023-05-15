const multer = require('multer');
const uuid4 = require('uuid4')

var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, `${uuid4()}-${file.originalname}`);
    }
  }),
})

module.exports = upload