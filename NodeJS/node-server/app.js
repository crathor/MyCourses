const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const PORT = process.env.PORT || 3000;

const ErrorController = require('./controllers/errors');

app.use(bodyParser.urlencoded({ extended: false })); // BODY PARSER
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(ErrorController.pageNotFound);

app.listen(PORT, () => {
  console.log(`listening on Port:${PORT}`);
});
