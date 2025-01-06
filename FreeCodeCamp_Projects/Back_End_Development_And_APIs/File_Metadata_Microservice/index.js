var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// middleware for multipart/form-data
app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  next();
})

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// handle file upload post request
app.post('/api/fileanalyse', (req, res) => {
  res.json({ name: req.file.originalname, type: req.file.mimetype, size: req.file.size })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
