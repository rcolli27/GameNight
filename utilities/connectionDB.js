var Connection = require('../models/connection');
/*
let det1 = "Scrabble with friends!";
let det2 = "Monopoly with friends!";
let det3 = "The Game of Life with friends!";
let det4 = "Poker with friends!";
let det5 = "Black Jack with friends!";
let det6 = "Apples to Apples with friends!";

let con1 = new Connection(1, 'Board', 'Scrabble', det1, "2020-03-07T13:00", "Woodward 120");
let con2 = new Connection(2, 'Board', 'Monopoly', det2, "2020-03-08T13:00", "Woodward 120");
let con3 = new Connection(3, 'Board', 'The Game of Life', det3, "2020-03-09T13:00", "Woodward 120");
let con4 = new Connection(4, 'Card', 'Poker', det4, "2020-03-07T18:00", "Woodward 120");
let con5 = new Connection(5, 'Card', 'Black Jack', det5, "2020-03-08T18:00", "Woodward 120");
let con6 = new Connection(6, 'Card', 'Apples to Apples', det6, "2020-03-09T18:00", "Woodward 120");
let con7 = new Connection(7, 'Home', 'Apples to Apples', det6, "2020-03-09T18:00", "Woodward 120");


let connections = [con1, con2, con3, con4, con5, con6, con7];
*/ // No longer needed because of MongoDB

var mongoose = require("mongoose");

var connectionSchema = new mongoose.Schema({
    _id: Number,
    type: String,
    game: String,
    details: String,
    date: String,
    time: String,
    location: String,
    userID: Number
}, { collection: "Connections" });

let connectionModel = mongoose.model("Connections", connectionSchema)

function getConnections() {   //Finds all connections from the database and returns an array of the objects
    return new Promise((resolve, reject) => {
        connectionModel.find({}).then((data) => {

            let connections = [];
            data.forEach((connection) => {      //converts the JSON object to an array and creates new connection objects to attribute the data as a connection
                let connectionObj = new Connection(connection._id, connection.type, connection.game, connection.details, connection.time, connection.location, connection.userID);
                connections.push(connectionObj);
            });
            resolve(connections);
            })
            .catch((err) => {
                return reject(err);
            });
    });
};

function getConnection(ID) {  //Find a specific connection from the database and return it
    return new Promise((resolve, reject) => {
        connectionModel.find({ _id: ID })
            .then((data) => {
                let connectionObj = new Connection(data[0]._id, data[0].type, data[0].game, data[0].details, data[0].time, data[0].location, data[0].userID);
                resolve(connectionObj);
            })
            .catch((err) => {
                return reject(err);
            });
    });
};

function addConnection(connection, user) {
    return new Promise((resolve, reject) => {
        let conn = new connectionModel({
            _id: connection.ID,
            type: connection.type,
            game: connection.game,
            details: connection.details,
            date: connection.date,
            time: connection.time,
            location: connection.location,
            userID: user.userID
        });

        conn.save(function (err, data) {
            if (data) resolve(data);
            else return reject(err);
        });
    });
}

module.exports = {
    getConnections: getConnections,
    getConnection: getConnection,
    connectionModel: connectionModel,
    addConnection: addConnection
};