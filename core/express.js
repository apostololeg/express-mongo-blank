var http = require('http'),
    express = require('express'),
    stylus = require('stylus'),
    config = require('../.config.json'),
    routes = require('./routes.js'),
    path = require('path'),
    memoryStore = express.session.MemoryStore,
    sessionStore = new memoryStore();

exports.configure = function(app){

    var params = { auth: { user: 's', pswd: 's' } },
        auth = express.basicAuth(
            function( user, pswd ){
                return
                    user == params.auth.user &&
                    pswd == params.auth.pswd;
            },
            'SPEAKER AREA'
        );

    app
        .configure(function(){
            var week = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

            app
                .set('port', process.env.PORT || config.port)
                .set('views', __dirname + '/../views')
                .set('view engine', 'jade')
                .use(express.bodyParser())
                .use(express.cookieParser())
                .use(express.session({
                    store: sessionStore,
                    secret: 'iuy9iu19dh983hsy',
                    maxAge  : week,
                    expires : week,
                    key: 'express.sid'
                }))
                .use(app.router)
                .use(express.static(path.join(__dirname, '/../public')))
                .use(stylus.middleware({src: __dirname + '/public/styles/'}));
        })
        .configure('development', function(){
            app.use(express.errorHandler());
        });

    // роутинг
    app.get('/', routes.index);
    app.post('/signout', routes.signout);
    app.post('/signin', routes.signin);

};

exports.startServer = function(server, port){

    server.listen(port, function(){
        console.log("Express server listening on port " + port);
    });

};


exports.express = express;
exports.sessionStore = sessionStore;
