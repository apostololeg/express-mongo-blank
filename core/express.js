var http = require('http'),
    express = require('express'),
    stylus = require('stylus'),
    config = require('../.config').params,
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
            app
                .set('port', process.env.PORT || config.port)
                .set('views', __dirname + '/../views')
                .set('view engine', 'jade')
                .use(express.cookieParser())
                .use(express.session({
                    store: sessionStore,
                    secret: 'iuy9iu19dh983hsy',
                    maxAge  : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // week
                    expires : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // week
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
    // TODO: baseAuth
    app.get('/signin', auth, routes.signin);
    app.get('/signout', routes.signout);
    app.get('/reg', routes.reg);
    app.get('/profile', routes.profile);

};

exports.startServer = function(server, port){

    server.listen(port, function(){
        console.log("Express server listening on port " + port);
    });

};


exports.express = express;
exports.sessionStore = sessionStore;
