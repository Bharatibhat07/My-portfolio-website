const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');

// GET /api/certificates - Get all certificates
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/certificates - Create new certificate (for admin)
router.post('/', async (req, res) => {
  try {
    const { title, status, issuer, issueDate, expiryDate, credentialId, credentialUrl } = req.body;

    if (!title || !status) {
      return res.status(400).json({ error: 'Title and status are required' });
    }

    const certificate = new Certificate({
      title,
      status,
      issuer,
      issueDate,
      expiryDate,
      credentialId,
      credentialUrl
    });

    await certificate.save();
    res.status(201).json({ message: 'Certificate added successfully', certificate });
  } catch (error) {
    console.error('Error saving certificate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/certificates/:id - Update certificate
router.put('/:id', async (req, res) => {
  try {
    const { title, status, issuer, issueDate, expiryDate, credentialId, credentialUrl } = req.body;

    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        issuer,
        issueDate,
        expiryDate,
        credentialId,
        credentialUrl
      },
      { new: true, runValidators: true }
    );

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.json({ message: 'Certificate updated successfully', certificate });
  } catch (error) {
    console.error('Error updating certificate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/certificates/:id - Delete certificate
router.delete('/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;