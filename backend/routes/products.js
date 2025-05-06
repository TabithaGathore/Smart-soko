const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all products
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new product
router.post('/', async (req, res) => {
  const { name, price, trader } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO products (name, price, trader) VALUES (?, ?, ?)', [name, price, trader]);
    const newProduct = { id: result.insertId, name, price, trader };
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
