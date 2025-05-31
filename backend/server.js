const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const sslcommerz = require('./sslcommerz');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

app.use('/api/payment', sslcommerz);

app.listen(5000, () => console.log('Server running on port 5000'));
