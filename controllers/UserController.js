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

    if (!req.body.username) user = await UserDB("rcolli27@uncc.edu");       //use rcolli27@uncc.edu as default or the passed in username, then find from database on email
    else user = await UserDB(req.body.username);

    let connections = await userProfileDB.getUserProfile(user.userID);      //given userID, find all userConnections

    req.session.user = new userProfile(user, connections);

    res.redirect('/savedConnections');
});


module.exports = router;