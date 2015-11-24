var connection_to_db = require('./db_connector.js');

module.exports={

    checkUser: function(req,callback){
        var regist=connection_to_db.db_connector.openDatabaseConnection();
        var qInsert="insert into test_username(username,password,first_name,"
            +"last_name, email values(?,?,?,?,?)";
        var getUser = "SELECT * FROM test_username WHERE username=?";
        var msgType='error';
        var msgVal="username is already taken";
        regist.query(getUser,[req.body.username],function(err,rows){
            if(rows.length===1) {
                callback(true,req.flash(msgType,msgVal));
            }else{
                callback(false, req.flash(msgType,"inserted"));
            }
        });
        connection_to_db.db_connector.closeDatabaseConnection(regist);
    },

    insertUser:function(req, callback){
        var r=connection_to_db.db_connector.openDatabaseConnection();
        var newUser={
            username:"'"+req.body.username+"',",
            password:"'"+req.body.password+"',",
            firstname:"'"+req.body.firstname+"',",
            lastname:"'"+req.body.lastname+"',",
            email:"'"+req.body.email+"'"
        }

        var values=" values ("+newUser.username+
            newUser.password+
            newUser.firstname+
            newUser.lastname+
            newUser.email+")";
        var qInsert="insert into test_username(username,password,first_name,last_name, email) "+values;
        if(r){
            r.query(qInsert,function(err,rows) {
                if (err) {
                    callback(err);
                } else {
                    callback("ok");
                }
            });
        }
        connection_to_db.db_connector.closeDatabaseConnection(r);
    }
};

