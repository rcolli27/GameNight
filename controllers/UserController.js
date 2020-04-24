var express = require('express');
var router = express.Router();

//POST handling parsers
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var UserDB = require('../utilities/UserDB');
var UserProfileDB = require('../utilities/UserProfileDB');

router.get('/logout', function (req, res) {         //log out the user
    req.session.destroy();
    res.redirect('/');
});

router.get('/', function (req, res) {               //load log in page
    res.render('login', {user: req.session.user});
});

router.post('/', async function (req, res) {              //log in the user

    let user = await UserDB(req.body.username);

    let connections = await UserProfileDB.getUserProfile(user.userID);

    console.log("User:" + user);
    console.log("Connections: " + connections);

    req.session.user = new UserProfile(user, connections);
    res.redirect('/');
});


module.exports = router;