var express = require('express');
var router = express.Router();

var Connection = require('../utilities/connectionDB');

let connections = Connection.getConnections(); //Gets list of connections
let categories = [];
for (conn of connections) {                     //Gets list of categories by iterating through each connection, reading the category type, then adding it to categories
    if (categories.indexOf(conn.type) == -1) {  //if it doesn't already exist
        categories.push(conn.type);
    }
}

//no parameters given
router.get('/', function (req, res) {
    if (Object.keys(req.query).length == 0 || Object.keys(req.query).length > 1) { //No parameter or invalid number of parameters
        res.render('connections', { connections: connections, categories: categories });
    } else {
         
    }
});

router.get('/:id', function (req, res) {
    let conn = Connection.getConnection(req.params.id);
    if (conn == -1) { //can't find the id in the available list
        res.render('connections', { connections: connections, categories: categories });
    } else {
        res.render('connection', { conn: conn });
    }
});

module.exports = router;