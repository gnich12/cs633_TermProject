var express = require('express');
var router = express.Router();


/* GET home page.*/
router.get('/profile', isLoggedIn, function(req, res, next) {
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
}



module.exports = router;