exports.db = function() {

    return require('mongoskin').db('localhost:27017/test');

};
