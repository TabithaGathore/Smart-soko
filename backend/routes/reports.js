const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all reports
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reports');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new report
router.post('/', async (req, res) => {
  const { type, description, status } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO reports (type, description, status) VALUES (?, ?, ?)', [type, description, status]);
    const newReport = { id: result.insertId, type, description, status };
    res.status(201).json(newReport);
  } catch (err) {
    console.error('Error adding report:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
