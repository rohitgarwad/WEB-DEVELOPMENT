require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// URL Shortener Microservice
let urls = [];
app.post('/api/shorturl', function (req, res) {
  const originalUrl = req.body.url;
  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  if (!urlRegex.test(originalUrl)) {
    res.json({ error: 'invalid url' });
  }
  const url = new URL(originalUrl);
  let shortUrl;
  dns.lookup(url.hostname, (err, address, family) => {
    if (err) {
      res.json({ error: 'invalid url' });
    } else {
      if (!urls.includes(url)) {
        shortUrl = parseInt(address.split('.')[0]);
        urls[shortUrl] = url;
        res.json({ original_url: originalUrl, short_url: shortUrl });
      } else {
        shortUrl = urls.indexOf(url);
        res.json({ original_url: originalUrl, short_url: shortUrl });
      }
    }
  });
}
);

// Redirect to the original URL
app.get('/api/shorturl/:shortUrl', function (req, res) {
  const shortUrl = req.params.shortUrl;
  res.redirect(urls[shortUrl]?.href);
}
);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
