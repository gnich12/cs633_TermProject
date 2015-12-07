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
        var query = "select first_name, last_name, email, comment," +
            " review_date, score, business_name, business.biz_id " +
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
                                biz_id: r.biz_id,
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
                            biz_id:rows[0].biz_id,
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
        var zip = (req.query.zipcode==='')? 0:parseInt(req.query.zipcode);
        var city =req.query.city;
        var state=req.query.state;
        var bname=req.query.bname;
        var where =checkSearch(city, state, zip, bname);
        var subq="select avg(score) as 'avg_score', biz_id"+
                 " from reviews  group by biz_id";
        var searchq="select q1.avg_score, business.biz_id, business_name, biz_description, address, city, "+
                     " state, phone_number, biz_email, zipcode "+
                     " from ("+subq+ ") q1 "+
                     " right join business on business.biz_id = q1.biz_id "+ where;


        var results={
            size:0,
            rows:[]
        };
        var msgType = 'search';
        var msgVal = "No Business Were Found!!";
        search.query(searchq, function(err, rows){
            if(err){
                console.log(err);
                callback(err);
            }else{
                if(rows.length===1){
                    results.size=rows[0].length;
                    results.rows.push(rows[0]);
                    callback(results);
                }else if(rows.length!=0){
                    results.size=rows.length;
                    rows.forEach(function(r){
                        results.rows.push(r);
                    });
                    callback(results);
                }else{
                    callback(results, req.flash(msgType, msgVal));
                }
            }
        });
        connection_to_db.db_connector.closeDatabaseConnection(search);
    },
    getBusProfile:function(req, callback){
        var bprof = connection_to_db.db_connector.openDatabaseConnection();
        var val = parseInt(req.params.biz_id);
        //var bqprof= "select username, review_date, score , comment , b1.biz_id, business_name," +
        //    " biz_description, address, city, state, phone_number, biz_email, zipcode"+
        //    " from business b1 "+
        //    " left join reviews on reviews.biz_id = b1.biz_id "+
        //    " right join test_username on test_username.id = reviews.id "+
        //    " where b1.biz_id=" +val;
         var bqprof="select review_date, score , comment , username, business.biz_id , business_name, biz_description, address, city, state," +
             " phone_number, biz_email, zipcode "+
             " from reviews b1 "+
             " left join test_username on test_username.id=b1.id "+
             " right join business on business.biz_id = b1.biz_id "+
             " where business.biz_id= "+val;

        var temp={
            businessId:'',
            business_name:'',
            description:'',
            address:'',
            city:'',
            phone:'',
            email:'',
            zipcode:'',
            reviews:[]
        };
        bprof.query(bqprof, function(err, rows){
            if(err){
                console.log(err);
                callback(err);
            }else{
                if(rows.length===1){
                    temp.businessId=rows[0].biz_id;
                    temp.business_name=rows[0].business_name;
                    temp.description=rows[0].biz_description;
                    temp.address=rows[0].address;
                    temp.city=rows[0].city;
                    temp.state=rows[0].state;
                    temp.phone=rows[0].phone_number;
                    temp.email=rows[0].biz_email;
                    temp.zipcode=rows[0].zipcode;
                    var rev={
                        flag:(rows[0].review_date===null ? 0:1),
                        date: rows[0].review_date,
                        username:rows[0].username,
                        comment: rows[0].comment,
                        score: rows[0].score
                    }
                    temp.reviews.push(rev);
                    callback(temp);
                }else{
                    temp.businessId=rows[0].biz_id;
                    temp.business_name=rows[0].business_name;
                    temp.description=rows[0].biz_description;
                    temp.address=rows[0].address;
                    temp.city=rows[0].city;
                    temp.state=rows[0].state;
                    temp.phone=rows[0].phone_number;
                    temp.email=rows[0].biz_email;
                    temp.zipcode=rows[0].zipcode;
                    rows.forEach(function(b){
                        var rev={
                            flag:(b.review_date===null ? 0:1),
                            date: b.review_date,
                            username: b.username,
                            comment: b.comment,
                            score: b.score
                        }
                        temp.reviews.push(rev);
                    });
                    callback(temp);
                }
            }
        });
        connection_to_db.db_connector.closeDatabaseConnection(bprof);
    },
    addReview:function(req, callback){
        var addRev=connection_to_db.db_connector.openDatabaseConnection();
        var values=" values ("+req.body.userid+" , "+req.body.busId+", '"+
                req.body.comment+"','"+req.body.date+"', "+parseInt(req.body.score)+")";
        var revq="insert into reviews(id, biz_id, comment, review_date, score) "+
                 values;
        addRev.query(revq, function(err, rows){
            if(err){
                console.log(err);
                callback(false, err);
            }else{
                callback(true);
            }

        });
        connection_to_db.db_connector.openDatabaseConnection(addRev);
    }
};

function checkSearch(city, state, zipcode, bname){
    var temp='';
    if(city!==''&& state!==''&& zipcode!==0 && bname!==''){
        temp= " where city='"+city+"' AND state='"+state+"' and zipcode="+zipcode+
            " and business_name='"+bname+"'";
    }else if(city!==''&& state!==''&& zipcode===0 && bname===''){
        temp= " where city='"+city+"' AND state='"+state+"'";
    }else if(city!==''&& state!==''&& zipcode===0 && bname!==''){
        temp= " where city='"+city+"' AND state='"+state+"'"+" and business_name='"+bname+"'";
    }else if(city===''&& state===''&& zipcode!==0 && bname===''){
        temp= " where zipcode="+zipcode;
    }else{
        temp= " where city='"+city+"' AND state='"+state+"' and zipcode="+zipcode+
            " and business_name='"+bname+"'";
    }
    return temp;
}