// server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: '1234567',
  resave: false,
  saveUninitialized: true,
}));

// Load data
const USERS_PATH = './data/users.json';
const RIDES_PATH = './data/rides.json';

// Helper functions
function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}


// Register
app.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  const users = readJSON(USERS_PATH);

  if (users.find(u => u.username === username)) {
    return res.send('User already exists.');
  }

  users.push({ username, password, role });
  writeJSON(USERS_PATH, users);
  res.redirect('/login.html');
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readJSON(USERS_PATH);
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.send('Invalid credentials.');

  req.session.user = user;

  // Redirect based on role
  if (user.role === 'Passenger') return res.redirect('/passenger.html');
  else return res.redirect('/driver.html');
});




// Request Ride
app.post('/request-ride', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'Passenger') {
    return res.status(401).send('Unauthorized');
  }

  const { pickup, destination } = req.body;
  const rides = readJSON(RIDES_PATH);

  rides.push({
    id: Date.now(),
    passenger: req.session.user.username,
    pickup,
    destination,
    status: 'Pending',
    driver: null
  });

  writeJSON(RIDES_PATH, rides);
  res.redirect('/passenger.html');
});

// Get Passenger Rides
app.get('/my-rides', (req, res) => {
  const rides = readJSON(RIDES_PATH);
  const userRides = rides.filter(r => r.passenger === req.session.user.username);
  res.json(userRides);
});




// Get Pending Rides
app.get('/pending-rides', (req, res) => {
  const rides = readJSON(RIDES_PATH);
  const pending = rides.filter(r => r.status === 'Pending');
  res.json(pending);
});

// Accept Ride
app.post('/accept-ride', (req, res) => {
  const { rideId } = req.body;
  const rides = readJSON(RIDES_PATH);
  const ride = rides.find(r => r.id == rideId);

  if (ride && ride.status === 'Pending') {
    ride.status = `Accepted by ${req.session.user.username}`;
    ride.driver = req.session.user.username;
    writeJSON(RIDES_PATH, rides);
    res.redirect('/driver.html');
  } else {
    res.send('Ride not found or already accepted.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

