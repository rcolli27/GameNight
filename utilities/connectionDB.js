var Connection = require('../models/connection');

let det1 = "Scrabble with friends!";
let det2 = "Monopoly with friends!";
let det3 = "The Game of Life with friends!";
let det4 = "Poker with friends!";
let det5 = "Black Jack with friends!";
let det6 = "Apples to Apples with friends!";

let con1 = new Connection(1, 'board', 'Scrabble', det1, "2020-03-07T13:00", "Woodward 120");
let con2 = new Connection(2, 'board', 'Monopoly', det2, "2020-03-08T13:00", "Woodward 120");
let con3 = new Connection(3, 'board', 'The Game of Life', det3, "2020-03-09T13:00", "Woodward 120");
let con4 = new Connection(4, 'card', 'Poker', det4, "2020-03-07T18:00", "Woodward 120");
let con5 = new Connection(5, 'card', 'Black Jack', det5, "2020-03-08T18:00", "Woodward 120");
let con6 = new Connection(6, 'card', 'Apples to Apples', det6, "2020-03-09T18:00", "Woodward 120");

let connections = [con1, con2, con3, con4, con5, con6];


var getConnections = function () {
    return connections;
};

var getConnection = function (ID) {
    for (var con of connections) {
        if (con.getID() == ID) return con;
    }
    return -1;
};

module.exports = {
    getConnections: getConnections,
    getConnection: getConnection
};