const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const mongoose = require('mongoose');

const localContacts = [];

const hasDatabase = () => mongoose.connection.readyState === 1;

// POST /api/contacts - Create new contact message
router.post('/', async (req, res) => {
  console.log('Received contact request:', req.body); // Add logging
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    if (!hasDatabase()) {
      const contact = {
        _id: Date.now().toString(),
        name,
        email,
        message,
        createdAt: new Date(),
      };

      localContacts.unshift(contact);
      console.log('Contact stored locally:', contact._id);
      return res.status(201).json({ message: 'Contact message stored locally', contact });
    }

    const contact = new Contact({
      name,
      email,
      message
    });

    await contact.save();
    console.log('Contact saved successfully:', contact._id);
    res.status(201).json({ message: 'Contact message saved successfully', contact });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/contacts - Get all contact messages (for admin)
router.get('/', async (req, res) => {
  try {
    if (!hasDatabase()) {
      return res.json(localContacts);
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;