var connection_to_db = require('./db_connector.js');

module.exports = {

    checkUser: function (req, callback) {
        var regist = connection_to_db.db_connector.openDatabaseConnection();
        var getUser = "SELECT * FROM test_username WHERE username=?";
        var msgType = 'error';
        var msgVal = "username is already taken";
        regist.query(getUser, [req.body.username], function (err, rows) {
            if (rows.length === 1) {
                callback(true, req.flash(msgType, msgVal));
            } else {
                callback(false, req.flash(msgType, "ok"));
            }
        });
        connection_to_db.db_connector.closeDatabaseConnection(regist);
    },

    insertUser: function (req, callback) {
        var r = connection_to_db.db_connector.openDatabaseConnection();
        var newUser = {
            username: "'" + req.body.username + "',",
            password: "'" + req.body.password + "',",
            firstname: "'" + req.body.firstname + "',",
            lastname: "'" + req.body.lastname + "',",
            email: "'" + req.body.email + "'"
        }

        var values = " values (" + newUser.username +
            newUser.password +
            newUser.firstname +
            newUser.lastname +
            newUser.email + ")";
        var qInsert = "insert into test_username(username,password,first_name,last_name, email) " + values;
        if (r) {
            r.query(qInsert, function (err, rows) {
                if (err) {
                    callback(err);
                } else {
                    callback("ok");
                }
            });
        }
        connection_to_db.db_connector.closeDatabaseConnection(r);
    },
    retrieveUser: function (req, callback) {
        var con = connection_to_db.db_connector.openDatabaseConnection();
        var query = "select * from test_username where id=?";
        var resultSet = [];
        if (con) {
            con.query(query, [req.params.id], function (err, rows) {
                if (err) {
                    callback(err);
                } else {
                    callback(rows[0]);
                }
            });
        }
        connection_to_db.db_connector.closeDatabaseConnection(con);
    },
    getComments: function (req, callback) {
        var con = connection_to_db.db_connector.openDatabaseConnection();
        var query = "select first_name, last_name, email, comment, review_date, score, business_name " +
            " from test_username " +
            " right join reviews on  reviews.id = test_username.id " +
            " left join business on reviews.biz_id=business.biz_id " +
            " where test_username.id=?;"
        var resultSet = {
            first_name: '',
            last_name: '',
            email: '',
            comments: [],
            flag: 0
        };
        if (con) {
            con.query(query, [req.params.id], function (err, rows) {

                if (err) {
                    callback(err);
                } else {
                    if (rows.length === 0) {//if there is not comment set flag to 1

                        resultSet.flag = 1;
                        callback(resultSet);

                    } else if (rows.length > 1) {// more than 1 comment
                        resultSet.first_name = rows[0].first_name;
                        resultSet.last_name = rows[0].last_name;
                        resultSet.email = rows[0].email;
                        resultSet.flag = 2;
                        rows.forEach(function (r) {
                            var temp = {
                                review_date: r.review_date,
                                comment: r.comment,
                                business_name: r.business_name,
                                score: r.score
                            }
                            resultSet.comments.push(temp);
                        });
                        callback(resultSet);
                    } else {//only 1 comment
                        resultSet.first_name = rows[0].first_name;
                        resultSet.last_name = rows[0].last_name;
                        resultSet.email = rows[0].email;
                        var storage = {
                            review_date: rows[0].review_date,
                            comment: rows[0].comment,
                            business_name: rows[0].business_name,
                            score: rows[0].score
                        }
                        resultSet.comments.push(storage);
                        callback(resultSet);
                    }
                }
            });
        }
        connection_to_db.db_connector.closeDatabaseConnection(con);
    },
    insertBusiness:function(req, callback){
        var r = connection_to_db.db_connector.openDatabaseConnection();
        var newUser = {
            username: "'" + req.body.username + "',",
            password: "'" + req.body.password + "',",
            firstname: "'" + req.body.firstname + "',",
            lastname: "'" + req.body.lastname + "',",
            email: "'" + req.body.email + "'"
        }

        var values = " values (" + newUser.username +
            newUser.password +
            newUser.firstname +
            newUser.lastname +
            newUser.email + ")";
        var qInsert = "insert into business_user(biz_username,biz_password,"
                    + " first_name,last_name, email) " + values;
        if (r) {
            r.query(qInsert, function (err, rows) {
                if (err) {
                    callback(err);
                } else {
                    callback("ok");
                }
            });
        }
        connection_to_db.db_connector.closeDatabaseConnection(r);
    },
    checkBusinessUser:function(req, callback){
        var registUser = connection_to_db.db_connector.openDatabaseConnection();
        var getUser = "SELECT * FROM business_user WHERE biz_username=?";
        var msgType = 'biz_error';
        var msgVal = "username is already taken";
        registUser.query(getUser, [req.body.username], function (err, rows) {
            if (rows.length === 1) {
                callback(true, req.flash(msgType, msgVal));
            } else {
                callback(false, req.flash(msgType, "ok"));
            }
        });
        connection_to_db.db_connector.closeDatabaseConnection(registUser);
    },
    addBusiness:function(){
        var r = connection_to_db.db_connector.openDatabaseConnection();
        var newUser = {
            bizname: "'" + req.body.business_name + "',",
            bizdesc: "'" + req.body.biz_desc + "',",
            address: "'" + req.body.address + "',",
            city: "'" + req.body.city + "',",
            state: "'" + req.body.state + "'",
            phonenum: "'" + req.body.phone_number + "'",
            bizemail: "'" + req.body.biz_email + "'",
            zipcode: "'" + req.body.zipcode + "'"
        }

        var values = " values (" + newUser.username +
            newUser.password +
            newUser.firstname +
            newUser.lastname +
            newUser.email +
            newUser.zipcode+ ")";
        var qInsert = "insert into business_user(biz_username,biz_password,"
            + " first_name,last_name, email,zipcode) " + values;
        if (r) {
            r.query(qInsert, function (err, rows) {
                if (err) {
                    callback(err);
                } else {
                    callback("ok");
                }
            });
        }
        connection_to_db.db_connector.closeDatabaseConnection(r);
    },
    getBusinessUser:function(req, callback){
        var busUser = connection_to_db.db_connector.openDatabaseConnection();
        var getBusUser = "SELECT * FROM business_user WHERE biz_user_id=?";
        var msgType = 'biz_error';
        var msgVal = "username is already taken";
        busUser.query(getBusUser, [req.params.id], function (err, rows) {
           if(err){
               console.log(err);
               callback(err);
           }else{
               callback(rows[0]);
           }
        });
        connection_to_db.db_connector.closeDatabaseConnection(busUser);
    },
    getSearchResults:function(req, callback){
        var search = connection_to_db.db_connector.openDatabaseConnection();
        var subq="select avg(score) as 'avg_score', biz_id"+
                 " from reviews  group by biz_id";
        var searchq="select q1.avg_score, business.biz_id, business_name, biz_description, address, city, "+
                     " state, phone_number, biz_email"+
                     " from "+subq+ "q1"+
                     " left join business on business.biz_id = q1.biz_id"+
                     " where city=? OR business_name=?";
        connection_to_db.db_connector.closeDatabaseConnection(search);
    }
};

