var   express = require('express')
    , app = express()
    , routes = require('./routes.js')
    , path = require('path');

function configure() {

    app
        .configure(function(){
            app
                .set('port', process.env.PORT || 8000)
                .set('views', __dirname + '/../views')
                .set('view engine', 'ejs')
                .use(app.router)
                .use(express.static(path.join(__dirname, '/../public')));
        })
        .configure('development', function(){
            app.use(express.errorHandler());
        });

    // роутинг
    app.get('/', routes.index);

}

function startServer(http, app) {

    http.createServer(app).listen(app.get('port'), function(){
        console.log("Express server listening on port " + app.get('port'));
    });

}


exports.configure = configure;
exports.startServer = startServer;
exports.express = express;
exports.app = app;