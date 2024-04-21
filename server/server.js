const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      return cb(null, 'uploads/') // Specify the destination folder for uploaded images
  },
  filename: function (req, file, cb) {
      return cb(null, Date.now() + '-' + file.originalname) // Use a unique filename for each uploaded image
  }
});
const upload = multer({ storage});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



app.use('/', router);
app.listen(5000, () => {console.log("Server started on port 5000")});