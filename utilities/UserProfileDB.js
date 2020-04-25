var UserProfile = require('../models/UserProfile');
var Connection = require('../models/connection');
var User = require('../models/User');
var UserConnection = require('../models/UserConnection');
var connectionDB = require("./connectionDB");

let mongoose = require("mongoose");

var userProfileSchema = new mongoose.Schema({
    userID: Number,
    connID: Number,
    rsvp: String
}, {collection: "UserProfiles"});

let userProfileModel = mongoose.model("UserProfiles", userProfileSchema);

class UserProfileDB {

    getUserProfile(userID) {
        return new Promise((resolve, reject) => {       //return all userConnection objects associated 
            userProfileModel.find({ userID: userID })
                .then(async (data) => {
                    let userConns = [];

                    for (let connection of data) {
                        let conn = await connectionDB.getConnection(connection.connID);
                        
                        let connectionObj = new UserConnection(conn, connection.rsvp);
                        userConns.push(connectionObj);
                        
                    }
                    resolve(userConns);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    getCountGoing(connID) {
        return new Promise((resolve, reject) => {       //return all userConnection objects associated 
            userProfileModel.countDocuments({ connID: connID, rsvp: "yes" })
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    updateRSVP(userID, connID, rsvp) {
        return new Promise((resolve, reject) => {       //update or create userConnection in the UserProfiles collection to change the rsvp
            userProfileModel.findOneAndUpdate({             //userID and connID make a primary key
                userID: userID,
                connID: connID
            },
                { $set: { rsvp: rsvp } },                   //update rsvp
                { upsert: true },
                function (err, data) {
                    resolve(data);
                }

            )
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    addConnection(connection) {

    }

    removeUserConnection(userID, connID) {              //remove a relationship between a user and a connection
        return new Promise((resolve, reject) => {
            userProfileModel.findOneAndDelete({
                userID: userID,
                connID: connID
            })
                .then(resolve())
                .catch((err) => {
                    return reject(err);
                });
        });
    }

}

module.exports = UserProfileDB;