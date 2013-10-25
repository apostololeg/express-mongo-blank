var db = require('./mongodb.js'),
    utils = require('./utils.js'),
    config = require('./../.config').params;

// дополняем шаблоны базовыми параметрами
function __baseParams(params) {

    return utils.extend(params, config);

}

utils.extend(exports, {

    // main page
    index: function(req, res) {

        // console.log( req );

        res.render('main', __baseParams({
            title: 'main page',
            content: 'Hello!'
        }));

    },

    // registration
    reg: function(req, res) {

        params.res.render('reg', __baseParams({ title: 'Sign up' }));

    },

    // log in
    signin: function(req, res) {

        res.render('main', __baseParams({ content: 'look into console' }));

    },

    // log out
    signout: function(req, res) {

        console.log('OUT');
        console.log( res );
        // session = null;
        // res.clearCookie('connect.sid');
        // res.send('Authentication required', 401);

        res.render('main', __baseParams({ title: 'good bye!' }));

    },

    // profile page
    profile: function(req, res) {

        res.render('main', __baseParams({
            title: 'profile',
            content: 'This is your profiles, %username% !'
        }));

    }

});

