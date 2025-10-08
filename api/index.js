const { createServer } = require('http');
const app = require('../app');

module.exports = (req, res) => {
  const server = createServer((request, response) => app(request, response));
  server.emit('request', req, res);
};


