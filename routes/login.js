var express = require('express');
var router = express.Router();
/*
var passport = require('passport');
require('../DAO/authDAO.js')(passport);
*/


//GET home page.
router.get('/', function(req, res, next) {
    res.render('login',
        { title: 'Log In',
          project:"Business App",
          info:"",
          message:req.flash("loginMessage")
        });
    console.log(req.session);
});

/*router.get('/login',function(req, res){
    res.render('login',{
        title:'Log In',
        project:'Business App',
        message:req.flash('loginMessage')
    });
    console.log("call me 2");
});*/


//calls auth methods to verify credentials
/*router.post('/auth', passport.authenticate('local',{
        successRedirect : '/login/profile', // redirect to the secure profile section
        failureRedirect : '/',
        failureFlash: true// redirect back to the signup page if there is an error
    })
);*/
//renders profile page with info from DB
/*router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile',
        {title:'User Profile',
            name: req.user.first_name
        });
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}*/




module.exports = router;