var express = require('express');
var router = express.Router();


/* GET home page.*/


router.get('/', function(req, res, next) {
    res.render('register',
        {title:'Register',
         project:'Business App',
         message: req.flash('error'),
         info:''
    });
    console.log(req.session);
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}



module.exports = router;