const { Router } = require('express');
const pool = require('../db');
const router = Router();

router.get('/', (request, response, next) => {
  pool.query('SELECT * FROM monsters ORDER BY id ASC', (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

router.get('/:id', (req, response, next) => {
  const { id } = req.params;
  const query = `SELECT * FROM monsters WHERE id = $1`;
  pool.query(query, [id], (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

router.post('/', (request, response, next) => {
  const { name, personality } = request.body;

  pool.query(
    `INSERT INTO monsters(name, personality) VALUES ($1, $2)`,
    [name, personality],
    (err, res) => {
      if (err) return next(err);

      response.redirect('/monsters');
    },
  );
});

module.exports = router;
