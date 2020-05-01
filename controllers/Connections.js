var express = require('express');
var router = express.Router();

//POST handling parsers
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const { check, validationResult } = require('express-validator');

var Connection = require("../models/Connection");
var UserProfile = require("../models/UserProfile");

var connectionDB = require('../utilities/connectionDB');
var UserProfileDB = require("../utilities/UserProfileDB");
var userProfileDB = new UserProfileDB();



//no parameters given
router.get('/', async function (req, res) {
    
    let connections = await connectionDB.getConnections(); //Gets list of connections

    let categories = [];
    for (conn of connections) {                     //Gets list of categories by iterating through each connection, reading the category type, then adding it to categories
        if (categories.indexOf(conn.type) == -1) {  //if it doesn't already exist
            categories.push(conn.type);
        }
    }

    res.render('connections', { connections: connections, categories: categories, user: req.session.user });
    
});

router.get('/:id', async function (req, res) {
    
    let conn = await connectionDB.getConnection(req.params.id);
    
    if (conn == -1) { //can't find the id in the available list
        res.redirect('/connections');
    } else {

        let count = await userProfileDB.getCountGoing(conn.ID);

        req.session.conn = conn;
        res.render('connection', { conn: conn, user: req.session.user, count: count });
    }
});

router.post('/', urlencodedParser,
    [check('type').matches(/^[A-Za-z0-9 ]+$/i).trim().escape(), check('game').matches(/^[A-Za-z0-9 ]+$/i).trim().escape(),
    check('details').matches(/^[A-Za-z0-9 ]+$/i).trim().escape(), check('location').matches(/^[A-Za-z0-9 ]+$/i).trim().escape(),],
    async function (req, res) {
    //Validation

        let errs = [];

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            for (let error of errors.errors) {
                if (error.param == 'type') {
                    errs.push("Type must only contain letters, numbers, and spaces.");
                } else if (error.param == 'game') {
                    errs.push("Game must only contain letters, numbers, and spaces.");
                } else if (error.param == 'details') {
                    errs.push("Details must only contain letters, numbers, and spaces.");
                } else if (error.param == 'location') {
                    errs.push("Location must only contain letters, numbers, and spaces.");
                } else errs.push(error.msg);
            }
            return res.render('newConnection', { user: req.session.user, errors: errs });
        }

        let count = await connectionDB.connectionModel.countDocuments();


        //split datetime to show date then time                                                         
        //Ugly code that allows for parsing of date and time from the date time input
        let datetime = req.body.time.split("T");
        let tempdate = datetime[0].split("-");
        let date = tempdate[1] + "/" + tempdate[2] + "/" + tempdate[0];

        //split time to show hour and minute to swap from 24hr to 12hr clock
        let temptime = datetime[1].split(":");
        let time;
        if (parseInt(temptime[0]) == 0) {
            time = '12:' + temptime[1] + 'AM';
        } else if (parseInt(temptime[0]) > 0 && parseInt(temptime[0]) < 12) {
            time = datetime[1] + 'AM'
        }
        else if (parseInt(temptime[0]) == 12) {
            time = datetime[1] + 'PM';
        } else {
            time = temptime[0] - 12 + ':' + temptime[1] + 'PM';
        }

        //dumb variable names but oh well, it works
        let conn = new Connection((count + 1), req.body.type, req.body.game, req.body.details, date, time, req.body.location, req.session.user.user.userID);

        await connectionDB.addConnection(conn, req.session.user.user);

        await userProfileDB.addConnection(conn, req.session.user.user);

        let connections = await userProfileDB.getUserProfile(req.session.user.user.userID);

        req.session.user = new UserProfile(req.session.user.user, connections);

        res.redirect("/savedConnections");
})

module.exports = router;