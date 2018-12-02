const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const userRoutes = require('./routes/user.js');
const homeRoutes = require('./routes/home.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);
app.use(homeRoutes);

app.listen(3001);
