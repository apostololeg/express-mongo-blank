var   express = require('express')
    , app = express()
    , routes = require('./routes.js')
    , path = require('path');

exports.configure = function() {

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

exports.express = express;
exports.app = app;