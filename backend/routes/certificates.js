const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const localCertificates = [];

const hasDatabase = () => mongoose.connection.readyState === 1;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, JPG, JPEG, PNG files are allowed'));
    }
  }
});

// GET /api/certificates - Get all certificates
router.get('/', async (req, res) => {
  try {
    if (!hasDatabase()) {
      console.warn('Database unavailable; serving local fallback certificates');
      return res.json(localCertificates);
    }

    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/certificates - Create new certificate with file upload
router.post('/', upload.single('certificateFile'), async (req, res) => {
  try {
    const { title, status, issuer, description, issueDate } = req.body;

    if (!title || !status || !issuer || !description) {
      return res.status(400).json({ error: 'Title, status, issuer and description are required' });
    }

    const parseMonthValue = (value) => {
      if (!value) return null;
      const parsed = new Date(`${value}-01T00:00:00.000Z`);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    };

    let credentialUrl = null;
    if (req.file) {
      credentialUrl = `/api/certificates/download/${req.file.filename}`;
    }

    if (!hasDatabase()) {
      console.warn('Database unavailable; saving certificate locally as fallback');
      const certificate = {
        _id: Date.now().toString(),
        title,
        status,
        issuer,
        description,
        issueDate: parseMonthValue(issueDate),
        credentialUrl,
        createdAt: new Date(),
      };

      localCertificates.unshift(certificate);
      return res.status(201).json({ message: 'Certificate stored locally', certificate });
    }

    const certificate = new Certificate({
      title,
      status,
      issuer,
      description,
      issueDate: parseMonthValue(issueDate),
      credentialUrl
    });

    await certificate.save();
    res.status(201).json({ message: 'Certificate added successfully', certificate: certificate.toObject() });
  } catch (error) {
    console.error('Error saving certificate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/certificates/download/:filename - Download certificate file
router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(404).json({ error: 'File not found' });
    }
  });
});

// GET /api/certificates/preview/:filename - Preview certificate file inline
router.get('/preview/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);

  res.sendFile(filePath, { headers: { 'Content-Disposition': 'inline' } }, (err) => {
    if (err) {
      console.error('Error previewing file:', err);
      res.status(404).json({ error: 'File not found' });
    }
  });
});

// PUT /api/certificates/:id - Update certificate
router.put('/:id', async (req, res) => {
  try {
    const { title, status, issuer, description, issueDate, credentialUrl } = req.body;
    const parseMonthValue = (value) => {
      if (!value) return null;
      const parsed = new Date(`${value}-01T00:00:00.000Z`);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    };

    if (!hasDatabase()) {
      const index = localCertificates.findIndex((item) => item._id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Certificate not found' });
      }

      localCertificates[index] = {
        ...localCertificates[index],
        title,
        status,
        issuer,
        description,
        issueDate: parseMonthValue(issueDate),
        credentialUrl,
      };

      return res.json({ message: 'Certificate updated locally', certificate: localCertificates[index] });
    }

    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        issuer,
        description,
        issueDate: parseMonthValue(issueDate),
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
    if (!hasDatabase()) {
      const index = localCertificates.findIndex((item) => item._id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Certificate not found' });
      }

      localCertificates.splice(index, 1);
      return res.json({ message: 'Certificate deleted locally' });
    }

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