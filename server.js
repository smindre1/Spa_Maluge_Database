const express = require('express');
require('dotenv').config();
const db = require('./config/connection');
const routes = require('./routes');
const { authMiddleware } = require("./utils/auth");
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the cors middleware and configure it to allow requests from specific origins
app.use(cors({ 
  origin: process.env.ORIGIN,
}));

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});