(function(doc) {

    var socket = io.connect('http://' + params.host + ':' + params.port);

    // receive data from server
    socket.on('server-to-client', function (data) {

        console.log( data );
        $(doc).trigger('socket.catch', data);

    });

    // send data to server
    $(doc).on('socket.emit', function(e, data) {

        socket.emit('client-to-server', data);

    });


})(window.document);
