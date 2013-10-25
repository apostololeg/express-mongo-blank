var config = require('../.config').params,
    express = require('./express.js'),
    routes = require('./routes.js');

exports.configure = function(server) {

    require('socket.io')
        .listen(server)
        .on('connection', function(socket) {

            socket.on('client-to-server', function (data) {

                typeof routes[data.dir] === 'function' && routes[data.dir]();

            });

        });

}
