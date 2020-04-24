var express = require('express');
var app = express();

//session handling
var session = require("express-session");
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(session({ secret: "nbad session secret" }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/GameNight', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');

app.use('*/assets', express.static('assets'));

let connections = require('./controllers/Connections');
let userController = require('./controllers/UserController');
let savedController = require('./controllers/SavedConnections');

app.use('/connections', connections);
app.use('/newConnection/post', connections);
app.use('/savedConnections', savedController);
app.use('/login', userController);

app.get('/', function (req, res) {
    res.render('index', {user: req.session.user});
});

app.get('/about', function (req, res) {
    res.render('about', { user: req.session.user });
});

app.get('/newConnection', function (req, res) {
    res.render('newConnection', { user: req.session.user });
});

app.get('/contact', function (req, res) {
    res.render('contact', { user: req.session.user });
});

app.post('/savedConnections', function (req, res) {
    res.render('savedConnections', { user: req.session.user });
});

app.post('/newConnection', function (req, res) {
    res.render('newConnection', { user: req.session.user });
});

app.listen(8080, '127.0.0.1');
console.log('listening on 127.0.0.1:8080');