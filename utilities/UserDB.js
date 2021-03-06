var User = require('../models/User');

/*
let det1 = "Scrabble with friends!";
let det2 = "Monopoly with friends!";

let con1 = new Connection(1, 'Board', 'Scrabble', det1, "2020-03-07T13:00", "Woodward 120");
let con2 = new Connection(2, 'Board', 'Monopoly', det2, "2020-03-08T13:00", "Woodward 120");

let user = new UserProfile(new User(1, "Ryan", "Collins", "rcolli27@uncc.edu"), [new UserConnection(con1, 'yes'), new UserConnection(con2, 'yes')]);
*/

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    _id: Number,
    first: String,
    last: String,
    email: String,
    password: String
}, {collection: "Users"});

let userModel = mongoose.model("Users", userSchema);

function getUser(username, password) {       //Finds the User given the username input
    return new Promise((resolve, reject) => {
        userModel.findOne({ email: username, password: password })     // Search Users collection for the email attributed with the user
            .then((data) => {
                if (data == null) {       //if username/password combo doesn't exist
                    resolve(-1);
                }
                let userObj = new User(data._id, data.first, data.last, data.email, data.password);

                resolve(userObj);
            })
            .catch((err) => {
                return reject(err);
            });
    });
}

module.exports = getUser;