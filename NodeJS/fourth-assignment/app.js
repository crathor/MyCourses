const Express = require('express');
const path = require('path');
const BodyParser = require('body-parser');

const PORT = 3000;
const app = Express();

const homeRoute = require('./routes/home');
const adminData = require('./routes/admin');

app.use(BodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(Express.static(path.join(__dirname, 'public')));
app.use(homeRoute);
app.use(adminData.router);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
