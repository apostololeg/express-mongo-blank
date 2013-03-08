var   http = require('http')
    , db = require('mongoskin').db('localhost:27017/test')
    , express = require('./core/express.js')
    , app = express.app;

// настройка express
express.configure();

// запускаем сервер
express.startServer(http, app);