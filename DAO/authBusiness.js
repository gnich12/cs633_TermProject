var connection_to_db = require('./db_connector.js');
var LocalStrategy = require('passport-local').Strategy;

module.exports =  function(passport){
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.biz_user_id);
    });
    // used to deserialize the user
    passport.deserializeUser(function(user, id, done) {
        var cUser=connection_to_db.db_connector.openDatabaseConnection();
        var q="SELECT * FROM business_user WHERE biz_user_id = ? ";
        cUser.query(q,[id], function(err, rows){
            done(err, rows[0]);
        });
        connection_to_db.db_connector.closeDatabaseConnection(cUser);
    });
    passport.use('business-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },function(req, username, password, done){
            var getUserPass = "SELECT * FROM business_user WHERE biz_username=?";
            var credentials=connection_to_db.db_connector.openDatabaseConnection();
            var msgType='authMessage';
            var msgVal='Something wrong with your username or password';
            credentials.query(getUserPass,[username],function(err, rows){
                if(err){
                    return done(err);
                }
                if(rows.length==0 || rows.length=== undefined ){
                    return done(null, false, req.flash(msgType,msgVal));
                }
                if(rows[0].biz_password!=password){
                    return done(null, false, req.flash(msgType,msgVal));
                }
                return done(null, rows[0]);
            });
            connection_to_db.db_connector.closeDatabaseConnection(credentials);
        })
    );
};

