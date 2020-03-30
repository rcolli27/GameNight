var express = require('express');
var router = express.Router();

//POST handling parsers
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var UserDB = require('../utilities/UserDB');

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});


router.post('/', function (req, res) {
    req.session.user = UserDB.user;
    res.redirect('/');
});


module.exports = router;