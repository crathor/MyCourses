const data = require('./data.json');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write(`
      <html>
        <title>Welcome</title>
        <body>
          <h1>Greetings</h1>
          <a href="/users" >users</a>
          <p>If you are new please sign up using the form below</p>
          <form action="/create-user" method="POST">
            <input name="username" type="text">
            <button type="submit">Sign up</button>
          </form>
        </body>
      </html>
    `);
    return res.end();
  }

  if (url === '/users') {
    res.write(`
    <html>
      <title>Welcome</title>
      <body>
        <h1>Users</h1>
        <a href="/" >home</a>
        <ul>
        ${data.users.map(user => {
          return `<li>${user}</li>`;
        })}
        </ul>
      </body>
    </html>
    `);
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    return req.on('end', err => {
      const parsedBody = Buffer.concat(body).toString();
      let user = parsedBody.split('=')[1];

      data.users.push(user);

      res.writeHead(302, { Location: '/users' });
      return res.end();
    });
  }
};

module.exports = requestHandler;
