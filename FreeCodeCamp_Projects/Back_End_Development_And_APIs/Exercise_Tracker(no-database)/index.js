const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

let users = [];

// handle user data post request
app.post('/api/users', (req, res) => {
  if (req.body.username) {
    let user = {
      username: req.body.username,
      _id: uuidv4(),
    }
    users.push({
      username: user.username,
      _id: user._id,
      count: 0,
      log: [],
    });
    res.json(user);
  } else {
    res.json({ error: "please provide username" })
  }
})

// handle all users get request
app.get('/api/users', (req, res) => {
  if (users) {
    res.json(users.map(user => {
      return {
        username: user.username,
        _id: user._id
      }
    }));
  } else {
    res.json(users);
  }
})

// handle exercise data post request
app.post('/api/users/:_id/exercises', (req, res) => {
  let existingUser = users.find(user => user._id === req.params._id);

  if (existingUser) {
    let description = req.body.description;
    let duration = parseInt(req.body.duration);
    let date = req.body.date ? new Date(req.body.date) : new Date();

    let exercise = {
      description: description,
      duration: duration,
      date: date,
    }

    existingUser.log = [...existingUser.log, exercise];

    existingUser.count = existingUser.log.length;

    res.json({
      username: existingUser.username,
      description: description,
      duration: duration,
      date: date.toDateString(),
      _id: existingUser._id
    });
  } else {
    res.json({ error: `user not found with _id: ${req.params._id}` });
  }
})

// handle user logs get request
app.get('/api/users/:_id/logs', (req, res) => {
  let existingUser = users.find(user => user._id === req.params._id);
  if (existingUser) {
    let limit = parseInt(req.query?.limit);
    let filterLogs;

    if (req.query.from && req.query.to) {
      filterLogs = existingUser.log.filter(log => (log.date.getDate() >= new Date(req.query.from).getDate()) && (log.date.getDate() <= new Date(req.query.to).getDate()));
    } else if (req.query.from) {
      filterLogs = existingUser.log.filter(log => (log.date.getDate() >= new Date(req.query.from).getDate()) && (log.date.getDate() <= new Date().getDate()));
    } else if (req.query.to) {
      filterLogs = existingUser.log.filter(log => (log.date.getDate() <= new Date(req.query.to).getDate()));
    }
    else {
      filterLogs = existingUser.log.filter(log => (log.date.getDate() <= new Date().getDate()));
    }

    filterLogs = filterLogs.sort(function(a, b) { return b.date - a.date}).map(log => {
      return {
        description: log.description,
        duration: log.duration,
        date: log.date.toDateString(),
      }
    });

    res.json({
      username: existingUser.username,
      _id: existingUser._id,
      from: req.query.from && new Date(req.query.from).toDateString(),
      to: req.query.to && new Date(req.query.to).toDateString(),
      count: (!limit || limit >= filterLogs.length) ? filterLogs.length : limit,
      log: (!limit || limit >= filterLogs.length) ? [...filterLogs] : filterLogs.slice(0, limit),
    })

  } else {
    res.json({ error: `user not found with _id: ${req.params._id}` });
  }
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
