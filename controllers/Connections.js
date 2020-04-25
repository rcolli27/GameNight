var express = require('express');
var router = express.Router();

var Connection = require('../utilities/connectionDB');
var UserProfileDB = require("../utilities/UserProfileDB");
var userProfileDB = new UserProfileDB();



//no parameters given
router.get('/', async function (req, res) {
    
    let connections = await Connection.getConnections(); //Gets list of connections

    let categories = [];
    for (conn of connections) {                     //Gets list of categories by iterating through each connection, reading the category type, then adding it to categories
        if (categories.indexOf(conn.type) == -1) {  //if it doesn't already exist
            categories.push(conn.type);
        }
    }

    res.render('connections', { connections: connections, categories: categories, user: req.session.user });
    
});

router.get('/:id', async function (req, res) {
    
    let conn = await Connection.getConnection(req.params.id);
    
    if (conn == -1) { //can't find the id in the available list
        res.render('connections', { connections: connections, categories: categories, user: req.session.user });
    } else {

        let count = await userProfileDB.getCountGoing(conn.ID);
        console.log(count);

        req.session.conn = conn;
        res.render('connection', { conn: conn, user: req.session.user, count: count });
    }
});

router.post('/', async function (req, res) {
    let con1 = new Connection(1, 'Board', 'Scrabble', det1, "2020-03-07T13:00", "Woodward 120");

    let conn = new Connection()
})

module.exports = router;