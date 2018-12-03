const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const handlebars = require('express-handlebars'); // handlebars engine import

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// app.engine(
//   'hbs',
//   handlebars({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs',
//   }),
//); // handlebars engine setup
app.set('view engine', 'ejs'); // choose engine. ejs is already ready to go in express hence no import.
//app.set('view engine', 'hbs'); // handlebars engine
//app.set('view engine', 'pug'); // choose engine. pug is already ready to go in express hence no import.
app.set('views', 'views'); // default is views. can point to another folder eg. templates/

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false })); // BODY PARSER
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('page-not-found', {
    pageTitle: 'Page Not Found',
    PageNotFoundCSS: true,
  });
});

app.listen(PORT, () => {
  console.log(`listening on Port:${PORT}`);
});
