const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
app.locals.dbConnected = false;
const mongoUri = process.env.MONGODB_URI && process.env.MONGODB_URI.trim();

if (mongoUri) {
  mongoose.connect(mongoUri)
    .then(() => {
      app.locals.dbConnected = true;
      console.log('MongoDB connected');
    })
    .catch(err => {
      app.locals.dbConnected = false;
      console.warn('MongoDB unavailable, running without database:', err.message);
    });
} else {
  console.log('MongoDB skipped: no MONGODB_URI provided');
}

// Routes
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/certificates', require('./routes/certificates'));
// Backend health check route
app.get("/", (req, res) => {
  res.send("Portfolio Backend API is running successfully 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});