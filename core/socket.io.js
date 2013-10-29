var config = require('../.config.json'),
    express = require('./express.js'),
    routes = require('./routes.js');

/**
 * Базовая настройка сокетов
 * @param {object} server – http-сервер
 */
function configure(server) {

    require('socket.io')
        .listen(server)
        .on('connection', onConnection);

}

/**
 * Действия при подключении новой сессии
 * @param {object} socket
 */
function onConnection(socket) {

    /**
     * Обработчик запросов от клиента
     * @param {object} data – объект с параметрами. Должен соответствовать формату:
     *     {
     *         cmd: {string} – комманда
     *         params: {object} – набор параметров, для выполнения текущей комманды
     *     }
     */
    socket.on('client-to-server', function(data) {

        console.log( 'client-to-server ' + data.cmd );

        // фиксируем набор комманд, возможных для запроса от клиента к серверу
        (data.cmd === 'get' || data.cmd === 'reg') &&
            routes[data.cmd](socket, data.params)

        data.dir && routes.bySocket.get(socket, data);

    });

}

/**
 * Проксирует ответ обратно на клиент
 * @param {object} socket
 * @param {object} params – дополнительны параметры в формате:
 *     {
 *         err: 'Сообщение об ошибке'
 *             или
 *         msg: 'Обычное сообщение'
 *     }
 */
function emit(socket, params) {

    socket.emit('server-to-client', params)

}


exports.configure = configure;
exports.emit = emit;
