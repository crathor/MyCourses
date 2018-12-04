const Express = require('express');

const router = Express.Router();

const users = [];

router.get('/add-user', (req, res, next) => {
  res.render('add-user', {
    pageTitle: 'Add User',
    links: ['add-user.css'],
    pageHeading: 'Add User',
    path: 'add-user',
  });
});
router.post('/add-user', (req, res, next) => {
  const user = req.body.username;
  users.push(user);
  res.redirect('/');
});

module.exports = {
  router,
  users,
};
