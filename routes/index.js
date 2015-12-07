var express = require('express');
var router = express.Router();
var passport = require('passport');
var biz=passport;
var usr=passport;
var newUser = require('../DAO/utilsDB.js');
require('../DAO/authDAO.js')(usr);
require('../DAO/authBusiness.js')(biz);
router.urlState='';
router.prev=''

/* GET home page. */
router.get('/', function (req, res, next) {
    router.urlState=req.originalUrl;
    if (req.session.passport === undefined) {
        res.render('index',
            {
                title: "express",
                project: "Business Directory",
                info: '',
                type_code: 1 //not login in
            });
    } else {
        res.render('index',
            {
                title: "express",
                project: "Business Directory",
                info: req.user.username,
                user_id: req.user.id,
                type_code: 2//logged in
            });  //console.log(req.session);
    }
});

//calls auth methods to verify credentials
router.post('/auth', usr.authenticate('local-login', {
        successRedirect: router.urlState, // redirect to the secure profile section
        failureRedirect: '/login',
        failureFlash: true// redirect back to the signup page if there is an error
    }),
    function(req, res) {
        console.log("hello");
        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
            //req.session.cookie.u
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect(router.urlState);
    }
);

router.post('/auth_business', biz.authenticate('business-login', {
        successRedirect: '/bus_profile', // redirect to the secure profile section
        failureRedirect: '/login',
        failureFlash: true// redirect back to the signup page if there is an error
    })
);


router.get('/back-to-results', function(req, res, next){
   res.redirect(router.prev);
});

router.get('/results',function(req, res, next){
    router.urlState=req.originalUrl;
    router.prev=req.originalUrl;
    if(req.user===undefined){
        newUser.getSearchResults(req, function(srch){

            res.render('results',{
                title:'Results',
                project: 'Business Directory',
                info:'',
                user_info:'',
                binfo:srch,
                type_code:1,
                error:req.flash('search')
            });
        });

    }else{
        newUser.getSearchResults(req, function(srch){
            res.render('results',{
                title:'Results',
                project: 'Business Directory',
                info:req.user.username,
                user_id:req.user.id,
                user_info:'',
                binfo:srch,
                type_code:2,
                error:req.flash('search')
            });
        });
    }
});

router.post('/review',function(req, res, next){
    console.log(router.urlState);
    newUser.addReview(req, function(stats){
        if(stats!==false){
            res.redirect(router.urlState);
        }else{
            res.send("problem");
        }
    });
});


router.get('/bus_profile/:biz_id', function(req, res, next){
    router.urlState=req.originalUrl;

    if(req.user!==undefined) {
        newUser.getBusProfile(req, function (data) {
            res.render('bus_profile', {
                title: data.business_name,
                project: 'Business Directory',
                info: req.user.username,
                user_id:req.user.id,
                bdata: data,
                type_code: 2
            });
        });
    }else{
        newUser.getBusProfile(req, function (data) {
            res.render('bus_profile', {
                title: data.business_name,
                project: 'Business Directory',
                info: '',
                user_id:'',
                bdata: data,
                type_code: 1
            });
        });
    }
});

router.get('/profile/:user/:id', isLoggedIn ,function (req, res, next) {
    // gets user info and comments.
    router.urlState='/';
    newUser.getComments(req, function (inf) {
        console.log(inf);
        if (inf.flag == 0 || inf.flag == 2) {
            //render the profile page if there are 1 or more than
            //one comment
            res.render('profile', {
                title: 'User profile',
                project: 'Business Directory',
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
                    project: 'Business Directory',
                    info: req.user.username,
                    user_id: "",
                    user_info: inf,
                    type_code: 3//on profile
                });
            });

        }

    });
});
router.post('/user', function (req, res, next) {
    router.urlState='/';
    newUser.checkUser(req, function (c) {
        if (c === true) {
            res.redirect('/user_regis');
        } else {
            newUser.insertUser(req, function (st) {
                if (st.err) {
                    res.redirect('/user_regis');
                } else {
                    res.redirect('/login');
                }
            })
        }
    });
});

router.get('/user_regis', function(req, res, next) {
    res.render('user_registration',
        {title:'Register',
            project:'Business Directory',
            message: req.flash('error'),
            info:'',
            type_code:1
        });
    console.log(req.session);
});

router.get('/cancel', function(req, res, next){
    res.redirect(router.urlState);
});
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect(router.urlState);

});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/login');
}


module.exports = router;


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

//router.get('/bus_profile',function(req, res, next){
//    console.log(req.body);
//    newUser.getBusinessUser(req, function(biz){
//        res.render('bus_profile',{
//            title:'Business Profile',
//            project: 'Business Directory',
//            info:'',
//            user_info:biz,
//            type_code:1
//        });
//    });
//
//});
