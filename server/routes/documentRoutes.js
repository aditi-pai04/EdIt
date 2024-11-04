// server/routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

// Create a new document
router.post('/', async (req, res) => {
  try {
    const document = new Document({ title: req.body.title });
    await document.save();
    res.json(document);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Get a document by ID
router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ msg: 'Document not found' });
    res.json(document);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Update a document by ID
router.put('/:id', async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content, updatedAt: Date.now() },
      { new: true }
    );
    res.json(document);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
