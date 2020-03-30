var express = require('express');
var router = express.Router();

//POST handling parsers
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var Connection = require('../models/connection');
var UserProfile = require('../models/UserProfile');
var UserDB = require('../utilities/UserDB');

router.get('/', function (req, res) {
    res.render('savedConnections', { user: req.session.user });
})


router.post('/yes', function (req, res) {

    var profile = UserDB();
    var conn = req.session.conn
    profile.addConnection(conn, "yes");
    
    req.session.user = profile;
    
    res.render('savedConnections', { user: req.session.user });
});

router.post('/no', function (req, res) {
    var profile = UserDB();
    var conn = req.session.conn
    profile.addConnection(conn, "no");

    req.session.user = profile;

    res.render('savedConnections', { user: req.session.user });
});

router.post('/maybe', function (req, res) {
    var profile = UserDB();
    var conn = req.session.conn
    profile.addConnection(conn, "maybe");

    req.session.user = profile;

    res.render('savedConnections', { user: req.session.user });
});

router.post('')




module.exports = router;