var UserProfile = require('../models/UserProfile');
var Connection = require('../models/connection');
var User = require('../models/User');
var UserConnection = require('../models/UserConnection');

let mongoose = require("mongoose");

var userProfileSchema = new mongoose.Schema({
    userID: Number,
    connID: Number,
    rsvp: String
});

let userProfileModel = mongoose.model("UserProfiles", userProfileSchema);

class UserProfileDB {

    getUserProfile(userID) {
        return new Promise((resolve, reject) => {       //return all userConnection objects associated 
            userProfileModel.find({ userID: userID })
                .then((data) => {
                    let userConns = [];

                    data.forEach((connection) => {      //converts the JSON object to an array and creates new connection objects to attribute the data as a connection
                        let connectionObj = new Connection(connection._id, connection.type, connection.game, connection.details, connection.time, connection.location);
                        userConns.push(connectionObj);
                    });

                    resolve(userConns);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    addRSVP(connID, userID, rsvp) {
        return new Promise((resolve, reject) => {       //create new userConnection in the UserProfiles collection
            let userConn = new userProfileModel({           //create new document based off the model
                userID: userID,
                connID: connID,
                rsvp: rsvp
            });

            userConn.save(function (err, data) {            //save the document to the collection
                if (data) resolve(data);
                else return reject(err);
            });
        });
    }

    addRSVP(connID, userID, rsvp) {
        return new Promise((resolve, reject) => {       //update userConnection in the UserProfiles collection to change the rsvp
            userProfileModel.findOneAndUpdate({             //userID and connID make a primary key
                userID: userID,
                connID: connID
            },
                { $set: { rsvp: rsvp } },                   //update rsvp
                function (err, data) {
                    resolve(data);
                }

            )
                .catch((err) => {
                    return reject(err);
                });
        });
    }

}