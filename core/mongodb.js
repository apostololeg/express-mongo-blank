var skin = require('mongoskin'),
    config = require('../.config.json'),
    dbList = {};

exports.db = function(dbName) {

    console.log( process.env.MONGO_URL || config.host + ':' + config.dbPort + '/' + dbName );

    if (!dbList[dbName])
        dbList[dbName] = skin.db(process.env.MONGO_URL || config.host + ':' + config.dbPort + '/' + dbName);

    return dbList[dbName];

};
