var express = require('express');
var router = express.Router();

//POST handling parsers
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var UserProfile = require('../models/UserProfile');
var connectionDB = require("../utilities/connectionDB");
var UserProfileDB = require("../utilities/UserProfileDB");
var userProfileDB = new UserProfileDB();

router.get('/', function (req, res) {
    res.render('savedConnections', { user: req.session.user });
})


router.post('/yes', async function (req, res) {

    if (req.session.user) {
        var conn = req.session.conn;

        await userProfileDB.updateRSVP(req.session.user.user.userID, conn.ID, "yes");

        let connections = await userProfileDB.getUserProfile(req.session.user.user.userID);

        req.session.user = new UserProfile(req.session.user.user, connections);

        res.redirect("/savedConnections");
    } else {
        res.redirect('/login');
    }
});

router.post('/no', async function (req, res) {

    if (req.session.user) {
        var conn = req.session.conn;

        await userProfileDB.updateRSVP(req.session.user.user.userID, conn.ID, "no");

        let connections = await userProfileDB.getUserProfile(req.session.user.user.userID);

        req.session.user = new UserProfile(req.session.user.user, connections);

        res.redirect("/savedConnections");
    } else {
        res.redirect('/login');
    }
});

router.post('/maybe', async function (req, res) {

    if (req.session.user) {
        var conn = req.session.conn;

        await userProfileDB.updateRSVP(req.session.user.user.userID, conn.ID, "maybe");

        let connections = await userProfileDB.getUserProfile(req.session.user.user.userID);

        req.session.user = new UserProfile(req.session.user.user, connections);

        res.redirect("/savedConnections");
    } else {
        res.redirect('/login');
    }
});

router.post('/delete', urlencodedParser, async function (req, res) {

    userProfileDB.removeUserConnection(req.session.user.user.userID, req.body.delete);

    let connections = await userProfileDB.getUserProfile(req.session.user.user.userID);

    req.session.user = new UserProfile(req.session.user.user, connections);

    res.redirect("/savedConnections");
});

router.post('/update', urlencodedParser, async function (req, res) {

    let conn = await connectionDB.getConnection(req.body.update);

    let id = conn.ID;

    let url = "/connections/" + id;

    res.redirect(url);
});





module.exports = router;