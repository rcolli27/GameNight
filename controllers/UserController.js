var express = require('express');
var router = express.Router();

//POST handling parsers
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var userProfile = require("../models/UserProfile");

const { check, validationResult } = require('express-validator');

var connectionDB = require("../utilities/connectionDB");
var UserDB = require('../utilities/UserDB');
var UserProfileDB = require('../utilities/UserProfileDB');
let userProfileDB = new UserProfileDB();

router.get('/logout', function (req, res) {         //log out the user
    req.session.destroy();
    res.redirect('/');
});

router.get('/', function (req, res) {               //load log in page
    if (req.session.user) return res.redirect('/savedConnections'); //Send the user to their profile if they are logged in

    res.render('login', {user: req.session.user, errors: null});
});

router.post('/', urlencodedParser, [check('username').isEmail().trim().escape(),
    check('password').isLength({ min: 5 }).trim().escape()],
    async function (req, res) {              //log in the user

        let errs = [];

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            if (errors.errors[0].param == 'username') {            //checks if username is the first error
                errs.push("username must be an email address");
                if (errors.errors[1].param == 'password') errs.push("password must be at least 5 characters");     //checks  if the password is invalid, given the username is invalid
            }
            else if (errors.errors[0].param == 'password') errs.push("password must be at least 5 characters");    //checks if the password is invalid, given the username is valid

            return res.render('login', { user: req.session.user, errors: errs });
        }
        let user;

        user = await UserDB(req.body.username, req.body.password);

        if (user == -1) {
            errs.push("Invalid username or password. Please try again");
            return res.render('login', { user: req.session.user, errors: errs });
        }

        let connections = await userProfileDB.getUserProfile(user.userID);      //given userID, find all userConnections

        req.session.user = new userProfile(user, connections);

        res.redirect('/savedConnections');
});


module.exports = router;