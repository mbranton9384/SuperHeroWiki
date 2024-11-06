require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const superheroRoutes = require('./routes/superhero');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api/superhero', superheroRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});










