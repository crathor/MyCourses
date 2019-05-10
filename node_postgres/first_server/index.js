const http = require('http');

const HOSTNAME = 'localhost';
const PORT = 4000;

const server = http.createServer((req, res) => {
  const { url } = req;

  console.log(url);

  if (url === '/translations') {
    const translations = { 1: 'one', 2: 'two', 3: 'three' };

    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(translations), error => {
      console.log(error);
    });
    res.end();
  }

  res.end('Welcome to Node!');
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`🚀Running on ${HOSTNAME}:${PORT}`);
});
