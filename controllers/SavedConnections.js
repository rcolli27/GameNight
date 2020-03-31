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
    if (req.session.user) {
        var profile = UserDB();
        var conn = req.session.conn;

        if (req.session.update) {
            profile.updateRSVP(conn, "yes");
            req.session.update = false;
        } else {
            profile.addConnection(conn, "yes");
        }

        req.session.user = profile;

        res.render('savedConnections', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});

router.post('/no', function (req, res) {
    if (req.session.user) {
        var profile = UserDB();
        var conn = req.session.conn;

        if (req.session.update) {
            profile.updateRSVP(conn, "no");
            req.session.update = false;
        } else {
            profile.addConnection(conn, "no");
        }

        req.session.user = profile;

        res.render('savedConnections', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});

router.post('/maybe', function (req, res) {
    if (req.session.user) {
        var profile = UserDB();
        var conn = req.session.conn;

        if (req.session.update) {
            profile.updateRSVP(conn, "maybe");
            req.session.update = false;
        } else {
            profile.addConnection(conn, "maybe");
        }

        req.session.user = profile;

        res.render('savedConnections', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});

router.post('/delete', urlencodedParser, function (req, res) {
    var profile = UserDB();

    profile.removeConnection(profile.getUserConnections()[req.body.delete - 1]);

    req.session.user = profile;

    res.render('savedConnections', { user: req.session.user });
});

router.post('/update', urlencodedParser, function (req, res) {

    var profile = UserDB();

    let conn = profile.getUserConnections()[req.body.update - 1];

    req.session.update = true;
    let id = conn.connection.ID;

    let url = "/connections/" + id;

    res.redirect(url);
});





module.exports = router;