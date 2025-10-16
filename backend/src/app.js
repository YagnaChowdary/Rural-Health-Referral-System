/*const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send("API running ✅");
});

module.exports = app;
*/

// backend/src/app.js
const express = require('express');
const cors = require('cors');
const app = express();

// Import routes
const patientRoutes = require('./routes/patientRoutes');
const visitRoutes = require('./routes/visitRoutes');
const referralRoutes = require('./routes/referralRoutes'); 
const hospitalRoutes = require('./routes/hospitalRoutes');
const authRoutes = require('./routes/authRoutes');
const allowedOrigins = ['http://localhost:3000', 'https://rural-health-referral-system.netlify.app/'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API running ✅'));

// Tell the app to use your new routes
// Any URL starting with /api/patients will be handled by patientRoutes
app.use('/api/patients', patientRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/auth', authRoutes);
// You will add other routes here later
// app.use('/api/visits', visitRoutes);
// app.use('/api/referrals', referralRoutes);

module.exports = app;
