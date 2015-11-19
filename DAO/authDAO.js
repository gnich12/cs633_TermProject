var connection_to_db = require('./db_connector.js');
var LocalStrategy = require('passport-local').Strategy;

module.exports =  function(passport){


    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {

        var a=connection_to_db.db_connector.openDatabaseConnection();
        var q="SELECT * FROM test_username WHERE id = ? ";
        a.query(q,[id], function(err, rows){
            done(err, rows[0]);
        });
        connection_to_db.db_connector.closeDatabaseConnection(a);
    });

    passport.use('local',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },function(req, username, password, done){

            var getUserPass = "SELECT * FROM test_username WHERE username=?";
            var c=connection_to_db.db_connector.openDatabaseConnection();

            c.query(getUserPass,[username],function(err, rows){
                if(err)return done(err);
                if(!rows.length){
                    return done(null,false,req.flash('loginMessage','Something went wrong'));
                }
                return done(null, rows[0]);
            });
            connection_to_db.db_connector.closeDatabaseConnection(c);

        })

    );

};





