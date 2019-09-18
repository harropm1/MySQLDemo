var dbConn = require('./../inc/db_connection');
var dbQuery	= require('./../inc/db_queries');

var UserService = {};

UserService.postUserLogin = (req, res) => {
    dbConn.getDbConnection(dbQuery.postUserLogin, req, res);
};

module.exports = UserService;