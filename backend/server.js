const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const marketRoutes = require('./routes/market');
const productRoutes = require('./routes/products');
const reportRoutes = require('./routes/reports');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Smart Soko API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
