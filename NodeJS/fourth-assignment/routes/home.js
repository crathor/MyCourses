const Express = require('express');

const router = Express.Router();

const { users } = require('./admin.js');

router.get('/', (req, res, next) => {
  res.render('home', {
    pageTitle: 'Users',
    links: ['home.css'],
    pageHeading: 'Users List',
    users: users,
    path: '/',
  });
});

module.exports = router;
