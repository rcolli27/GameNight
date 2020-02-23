var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

let connections = require('./controllers/Connections.js');

app.use('/connections', connections);

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/newConnection', function (req, res) {
    res.render('newConnection');
});

app.get('/contact', function (req, res) {
    res.render('contact');
});

app.get('/savedConnections', function (req, res) {
    res.render('savedConnections');
});

app.listen(8080, '127.0.0.1');
console.log('listening');