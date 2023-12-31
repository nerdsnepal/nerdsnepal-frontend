const next = require('next');
const http = require('http');

const app = next({ dev:true });

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    // Set the 'x-forwarded-host' header to match the 'host' header
    req.headers['x-forwarded-host'] = req.headers['host'];

    return app.getRequestHandler()(req, res);
  });

  server.listen(5000, () => {
    console.log('> Ready on http://localhost:5000');
  });
});
