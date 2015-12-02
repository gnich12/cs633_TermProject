var express = require('express');
var router = express.Router();
var biz=require('passport');
require('../DAO/authDAO.js')(biz);
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
          message:req.flash("loginMessage"),
          message2:req.flash("authMessage"),
          type_code:1
        });
    console.log(req.session +"from login page");
});
router.post('/auth_business', biz.authenticate('business-login', {
        successRedirect: '/bus_profile', // redirect to the secure profile section
        failureRedirect: '/login',
        failureFlash: true// redirect back to the signup page if there is an error
    })
);

router.get('/ulogin',function(req, res, next){
    res.send('ok');
});

router.get('/bulogin',function(req, res, next){
    res.send('ok');
});

module.exports = router;