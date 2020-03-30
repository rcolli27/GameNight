var express = require('express');
var router = express.Router();

var Connection = require('../models/connection');
var UserProfile = require('../models/UserProfile');

router.get('/', function (req, res) {
    res.render('savedConnections', { user: req.session.user });
})


router.post('/yes', function (req, res) {

});

router.post('/no', function (req, res) {

});

router.post('/maybe', function (req, res) {

});

module.exports = router;