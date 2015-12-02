var express = require('express');
var router = express.Router();
var newUser = require('../DAO/utilsDB.js');
//var passport = require('passport');

//GET profile page.
router.get('/', function(req, res, next) {
    res.render('profile',{
            title:'Profile',
            project:'Business App',
            info:req.user.username,
            user_id:''
        }
    );console.log('from profile route');
});

router.get('/profile/:user/:id', function(req, res, next) {
    res.send("ok");
});


module.exports = router;