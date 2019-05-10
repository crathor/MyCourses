const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fortunes = require('./data/fortunes.json');

const app = express();

const FORTUNE_KEYS = ['message', 'lucky_number', 'spirit_animal'];

const writeFortunes = data => {
  fs.writeFile('./data/fortunes.json', JSON.stringify(data), error => {
    console.log(error);
  });
};

const getFortuneIds = arr => arr.map(f => f.id);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/fortunes', (req, res, next) => {
  res.json(fortunes);
});

app.get('/fortunes/random', (req, res, next) => {
  res.json(fortunes[Math.floor(Math.random() * fortunes.length)]);
});

app.get('/fortunes/:id', (req, res, next) => {
  res.json(fortunes.find(fortune => fortune.id == req.params.id));
});

app.post('/fortunes', (req, res, next) => {
  const { message, lucky_number, spirit_animal, batch_fortunes } = req.body;

  let updated_fortunes = [...fortunes];

  if (batch_fortunes) {
    batch_fortunes.forEach(fortune => {
      updated_fortunes.push({
        id:
          (updated_fortunes.length > 0
            ? Math.max(...getFortuneIds(updated_fortunes))
            : 0) + 1,
        ...fortune,
      });
    });
  } else {
    updated_fortunes.push({
      id:
        (updated_fortunes.length > 0
          ? Math.max(...getFortuneIds(updated_fortunes))
          : 0) + 1,
      message,
      lucky_number,
      spirit_animal,
    });
  }

  writeFortunes(updated_fortunes);
  res.json(updated_fortunes);
});

app.put('/fortunes/:id', (req, res, next) => {
  const old_fortune = fortunes.find(f => f.id == req.params.id);

  FORTUNE_KEYS.forEach(key => {
    if (req.body[key] || (key === 'lucky_number' && req.body[key] == 0)) {
      old_fortune[key] = req.body[key];
    }
  });

  writeFortunes(fortunes);

  res.json(fortunes);
});

app.delete('/fortunes/all', (req, res, next) => {
  writeFortunes([]);
  res.json([]);
});

app.delete('/fortunes/:id', (req, res, next) => {
  const { id } = req.params;

  const new_fortunes = fortunes.filter(f => f.id != id);

  writeFortunes(new_fortunes);

  res.json(new_fortunes);
});

module.exports = app;
