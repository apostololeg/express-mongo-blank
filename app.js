var http = require('http'),
    express = require('./core/express.js'),
    app = express.express(),
    server = http.createServer(app),
    socket = require('./core/socket.io.js');

// настройка express
express.configure(app);

// настройка socket.io
socket.configure(server);

// запускаем сервер
express.startServer(server, app.get('port'));
