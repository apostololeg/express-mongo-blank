(function(doc, $) {

    var user = $('.regform .input[name=user]'),
        pswd = $('.regform .input[name=pswd]'),
        login = $('.regform .login');


    $('.registration').on('click', function() {

        $(doc).trigger('socket.emit', {
            cmd: 'reg',
            params: {
                username: user.val(),
                password: pswd.val()
            }
        })

    });

    $('.regform .input').on('input', function() {

        // дисейблим кнопку "Вход" пока в одном из полей – пусто
        login.prop('disabled', (user.val() !== '' && pswd.val() !== '') ? '' : 'disabled')

    });

})(window.document, jQuery);
