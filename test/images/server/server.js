var http = require('http');

http.createServer(function(req, res) {
  res.end(process.env.MAGIC_FOO || 'no magic');
}).listen(80);