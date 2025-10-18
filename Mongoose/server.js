const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 7000;

// Import and run DB config
const dbconfig = require('./config/db');
dbconfig();

app.get('/', (req, res) => res.send('HELLO WORLD!'));

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}!`);
});
