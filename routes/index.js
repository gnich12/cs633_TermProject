var express = require('express');
var router = express.Router();
var passport = require('passport');
var biz=passport;
var usr=passport;
var newUser = require('../DAO/utilsDB.js');
require('../DAO/authDAO.js')(usr);
require('../DAO/authBusiness.js')(biz);

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.passport === undefined) {
        res.render('index',
            {
                title: "express",
                project: "Business Application",
                info: '',
                type_code: 1 //not login in
            });

    } else {
        res.render('index',
            {
                title: "express",
                project: "Business Application",
                info: req.user.username,
                user_id: req.user.id,
                type_code: 2//logged in
            });  //console.log(req.session);
    }
});



//calls auth methods to verify credentials
router.post('/auth', usr.authenticate('local-login', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/login',
        failureFlash: true// redirect back to the signup page if there is an error
    })
);

router.post('/auth_business', biz.authenticate('business-login', {
        successRedirect: '/bus_profile', // redirect to the secure profile section
        failureRedirect: '/login',
        failureFlash: true// redirect back to the signup page if there is an error
    })
);

//router.post('/regis', function (req, res, next) {
//    newUser.checkUser(req, function (c) {
//        if (c === true) {
//            res.redirect('/register');
//        } else {
//            newUser.insertUser(req, function (st) {
//                if (st.err) {
//                    res.redirect('/register');
//                } else {
//                    res.redirect('/login');
//                }
//            })
//        }
//    });
//});

router.get('/bus_profile',function(req, res, next){
    console.log(req.body);
    newUser.getBusinessUser(req, function(biz){
        res.render('bus_profile',{
            title:'Business Profile',
            project: 'Business app',
            info:'',
            user_info:biz,
            type_code:1
        });
    });

});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/');

});

//router.get('/bus_profile/:bizuser:id',function(req, res, next){
//
//});

router.get('/results', function(req, res, next){
    console.log(req.query);
    res.send('ok');
});

router.get('/profile/:user/:id', isLoggedIn ,function (req, res, next) {
    // gets user info and comments.
    newUser.getComments(req, function (inf) {
        console.log(inf);
        if (inf.flag == 0 || inf.flag == 2) {
            //render the profile page if there are 1 or more than
            //one comment
            res.render('profile', {
                title: 'User profile',
                project: 'Business Application',
                info: req.user.username,
                user_id: "",
                user_info: inf,
                type_code: 3//on profile
            });
        } else {
            //if there is no comment just retrieve user info
            newUser.retrieveUser(req, function (u) {
                inf.first_name = u.first_name;
                inf.last_name = u.last_name;
                inf.email = u.email;
                res.render('profile', {
                    title: 'User profile',
                    project: 'Business Application',
                    info: req.user.username,
                    user_id: "",
                    user_info: inf,
                    type_code: 3//on profile
                });
            });

        }

    });

});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}


module.exports = router;



