function index(req, res){

    res.render('index', {
        title: 'test',
        content: 'Welcome, %username% !',
    });

};


exports.index = index;