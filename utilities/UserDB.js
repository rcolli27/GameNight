var UserProfile = require('../models/UserProfile');
var Connection = require('../models/connection');
var User = require('../models/User');

let det1 = "Scrabble with friends!";
let det2 = "Monopoly with friends!";

let con1 = new Connection(1, 'Board', 'Scrabble', det1, "2020-03-07T13:00", "Woodward 120");
let con2 = new Connection(2, 'Board', 'Monopoly', det2, "2020-03-08T13:00", "Woodward 120");

let user = new UserProfile(new User(1, "Ryan", "Collins", "rcolli27@uncc.edu"), [con1, con2]);

module.exports = user;