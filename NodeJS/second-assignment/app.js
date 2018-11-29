const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log('first middleware');
//   next();
// });
// app.use((req, res, next) => {
//   console.log('second middleware');
//   res.send('<h1>The Response</h1>');
// });
app.use('/users', (req, res, next) => {
  res.send(`
  <ul>
    <li>Cody</li>
    <li>Rebecca</li>
  </ul>
  `);
});

app.use('/', (req, res, next) => {
  res.send('<h1>Welcome to the Homepage</h1>');
});

app.listen(3000);
