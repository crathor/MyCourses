const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const monsters = require('./routes/monsters');

app.use(bodyParser.json());

app.use('/monsters', monsters);

app.use((err, req, res, next) => {
  console.log('error');
  res.json(err);
});

module.exports = app;
