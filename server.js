const next = require('next');
const http = require('http');

const app = next({dev: process.env.NODE_ENV !== 'production'});

app.prepare().then(() => {
const server = http.createServer((req, res) => {
	return app.getRequestHandler()(req, res);
})
server.listen(3000,()=>{});
})
