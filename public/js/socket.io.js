(function(doc) {

    // require socket.io core
    $('<script src="/socket.io/socket.io.js">')
        .appendTo('body')
        .on('load', function(data) {
            console.log( data );
        });

    // var socket = io.connect('http://' + host + ':8081');

    // // receive data from server
    // socket.on('server-to-client', function (data) {

    //     $(doc).trigger('socket.catch', data);

    // });

    // // send data to server
    // $(doc).on('socket.emit', function(e, data) {

    //     socket.emit(data);

    // });

})(window.document);
