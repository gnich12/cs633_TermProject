/**
 * Created by Alvaro on 11/13/2015.
 */
var connection_to_db = require('./db_connector.js');
var countryDAO = {
    getAllCountries: function (callback) {
        var conn = connection_to_db.db_connector.openDatabaseConnection();
        var query = 'SELECT * FROM CITY';
        var resultSet = [];
        if (conn) {
            conn.query(query, function (err, rows, fields) {
                rows.forEach(function (r) {
                    resultSet.push(r);
                });
                callback(resultSet);
            });

        }
        connection_to_db.db_connector.closeDatabaseConnection(conn);
    }
};

exports.countryDAO = countryDAO;