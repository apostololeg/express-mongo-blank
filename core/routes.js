var db = require('./mongodb.js').db,
    users = db('test').collection('users'),
    sio = require('./socket.io.js'),
    utils = require('./utils.js'),
    config = require('./../.config.json');

/**
 * Alias to render main template
 * @param {object} res
 * @param {object} params – дополнительные параметры
 */
function renderMain(res, params) {
    res.render('main', utils.extend(params, config));
}

utils.extend(exports, {

    /**
     * Базовый шаблон
     * @param {object} req
     * @param {object} res
     */
    index: function(req, res) {

        renderMain(res, {
            title: 'main page',
            content: 'Hello!'
        });

    },

    /**
     * Вход. Инициализация сессии.
     * @param {object} req
     * @param {object} res
     */
    signin: function(req, res) {

        renderMain(res, { title: 'Вход' });

    },

    /**
     * Сброс пользовательской сессии
     * @param {object} req
     * @param {object} res
     */
    signout: function(req, res) {

        console.log('OUT');
        // console.log( res );
        // session = null;
        // res.clearCookie('connect.sid');
        // res.send('Authentication required', 401);

        renderMain(res, { title: 'good bye!' });

    },

    /**
     * Метод для отдачи на клиент шаблона запрашиваемого блока
     * @param {string} name имя блока
     * @return {json} шаблон блока в формате json
     */
    get: function(socket, name) {

        sio.emit(socket, require('./../public/blocks/' + name + '.json'));

    },

    /**
     * Метод для регистрации пользователя
     * @param {object} socket
     */
    reg: function(socket, params) {

        var username = params.username,
            password = params.password;

        // Проксируем ответ для удобной записи
        function answer(data) {
            sio.emit(socket, data);
        }

        // Проверка на свободный username
        users.findOne({ username: username }, function(err, reply) {

            // username занят
            if(err || reply) {
                answer({ err: 'Username already exist.' });
                return;
            }

            // Пробуем записать нового пользователя в базу
            users.insert(
                {
                    username: username,
                    password: password
                },
                { safe: true },
                function(err, records) {
                    answer(
                        err
                            ? { err: 'Write error =_(' }
                            : { msg: 'User "' + username + '" was added to database.' }
                    );
                }
            );

        });

    }

});
