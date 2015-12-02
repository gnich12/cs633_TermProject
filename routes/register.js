var express = require('express');
var router = express.Router();
var passport = require('passport');
var newUser = require('../DAO/utilsDB.js');
require('../DAO/authDAO.js')(passport);


/* GET home page.*/

router.get('/', function(req, res, next) {
    res.render('register',
        {title:'Register',
         project:'Business App',
         message: req.flash('error'),
         info:'',
         type_code:1
    });
    //console.log(req.session);
});
router.get('/biz_regis', function(req, res, next) {
    console.log(req+"<--");
    res.render('business_registration',
        {title:'Register',
            project:'Business App',
            message: req.flash('biz_error'),
            info:'',
            type_code:1
        });

});

router.get('/user_regis', function(req, res, next) {
    res.render('user_registration',
        {title:'Register',
            project:'Business App',
            message: req.flash('error'),
            info:'',
            type_code:1
        });
    console.log(req.session);
});

router.post('/user', function (req, res, next) {
    newUser.checkUser(req, function (c) {
        if (c === true) {
            res.redirect('/register/user_regis');
        } else {
            newUser.insertUser(req, function (st) {
                if (st.err) {
                    res.redirect('/register/user_regis');
                } else {
                    res.redirect('/login');
                }
            })
        }
    });
});



router.post('/biz_regis',function(req, res, next){
    newUser.checkBusinessUser(req, function (c) {
        if (c === true) {
            res.redirect('/register/biz_regis');
        } else {
            newUser.insertBusiness(req, function (st) {
                if (st.err) {
                    res.redirect('/register/biz_regis');
                } else {
                    res.redirect('/login');
                }
            })
        }
    });
})



module.exports = router;