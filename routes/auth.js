var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../DAO/authDAO.js')(passport);


//GET home page.
router.get('/', function(req, res, next) {
 res.send("ok");
 });

router.get('/profile',function(req, res){res.send("from auth")});

module.exports = router;