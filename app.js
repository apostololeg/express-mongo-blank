var   http = require('http')
    , db = require('mongoskin').db('localhost:27017/test')
    , express = require('./core/express.js')
    , app = express.app;

// настройка express
express.configure();

// запускаем сервер
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

// для начала нужно:
//   * установить mongodb
//   * запустить процесс mongod
// просматриваем содержимое коллекции
db.collection('test').find().toArray(function(err, result) {
    if (err) throw err;
    console.log( result );
});