var express = require('express');
var router = express.Router();

var Connection = require('../utilities/connectionDB');

//no parameters given
router.get('/', function (req, res) {
    let connections = Connection.getConnections();
    if (Object.keys(req.query).length == 0 || Object.keys(req.query).length > 1) { //No parameter or invalid number of parameters
        res.render('connections', { connections: connections });
    } else {
         
    }
});

router.get('/:id', function (req, res) {
    let connections = Connection.getConnections();
    let conn = Connection.getConnection(req.params.id);
    if (conn == -1) { //can't find the id in the available list
        res.render('connections', { connections: connections });
    } else {
        res.render('connection', { conn: conn });
    }
});

module.exports = router;