var mysql=require('mysql');
var db=require('./db_config.js');
var db_connector = {
    openDatabaseConnection : function(){
        var connection = mysql.createConnection(db.db_config.config);
        connection.connect(function(error){
            if (error){throw error}
            console.log("connected");
        });

        return connection;
    },
    closeDatabaseConnection: function(currentConnection){
        currentConnection.end(function (error){
            if (error){throw error}
            console.log("Close successfully");
        });
    }
}

exports.db_connector = db_connector;