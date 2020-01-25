const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3000;

var server = http.createServer(app).listen(3000);

server.on('listening', () => {
    console.log('Server listening on', PORT);
});
