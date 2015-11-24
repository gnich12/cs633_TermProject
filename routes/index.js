var express = require('express');
var router = express.Router();
var passport = require('passport');
var newUser=require('../DAO/registerDB.js');
require('../DAO/authDAO.js')(passport);

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.passport===undefined){
        res.render('index',
            {   title: "express",
                project: "Business Application",
                info:''
            });
        console.log("no data");
    }else{
        res.render('index',
            {   title: "express",
                project: "Business Application",
                info: req.user.username
            });  console.log(req.session);
    }
});


//calls auth methods to verify credentials
router.post('/auth', passport.authenticate('local-login',{
       successRedirect : '/', // redirect to the secure profile section
       failureRedirect : '/login',
       failureFlash: true// redirect back to the signup page if there is an error
    })

);

router.post('/regis',function(req, res, next){
    newUser.checkUser(req, function(c){
        if(c===true){
            res.redirect('/register');
        }else{
            newUser.insertUser(req, function(st){
                if(st.err){
                    res.redirect('/register');
                }else{
                    res.redirect('/login');
                }
            })
        }
    });
});


router.get('/logout', function(req, res, next){
    req.session.destroy();
    res.redirect('/');

});



//check middleware if user is authenticated
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    console.log(req.user);
    // if they aren't redirect them to the home page
    res.redirect('/');
}




module.exports = router;



