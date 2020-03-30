var express = require('express');
var router = express.Router();

//POST handling parsers
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var UserDB = require('../utilities/UserDB');

router.get('/logout', function (req, res) {         //log out the user
    req.session.destroy();
    res.redirect('/');
});


router.post('/', function (req, res) {               //log in the user
    req.session.user = UserDB();
    res.redirect('/');
});


module.exports = router;