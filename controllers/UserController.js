var express = require('express');
var router = express.Router();

//POST handling parsers
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var userProfile = require("../models/UserProfile");

var connectionDB = require("../utilities/connectionDB");
var UserDB = require('../utilities/UserDB');
var UserProfileDB = require('../utilities/UserProfileDB');
let userProfileDB = new UserProfileDB();

router.get('/logout', function (req, res) {         //log out the user
    req.session.destroy();
    res.redirect('/');
});

router.get('/', function (req, res) {               //load log in page
    res.render('login', {user: req.session.user});
});

router.post('/', urlencodedParser, async function (req, res) {              //log in the user

    let user;
    if (!req.body.username) user = await UserDB("rcolli27@uncc.edu");
    else user = await UserDB(req.body.username);

    let connections = await userProfileDB.getUserProfile(user.userID);

    console.log(user);
    console.log(connections);

    req.session.user = new userProfile(user, connections);
    console.log(req.session.user);
    res.redirect('/');
});


module.exports = router;