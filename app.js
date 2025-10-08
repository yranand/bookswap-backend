const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { sequelize } = require('./models');
const routes = require('./routes');

const app = express();

// middleware
app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api', routes);

// simple health
app.get('/', (req, res) => {
  res.json({ name: 'BookSwap Marketplace API', status: 'ok' });
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (e) {
    console.error('Failed to start server:', e.message);
    process.exit(1);
  }
}

start();


