const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get market info
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM market_info LIMIT 1');
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Market info not found' });
    }
  } catch (err) {
    console.error('Error fetching market info:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
