var connectionDB = require("../utilities/connectionDB");
var User = require('./user');

class UserProfile {
    constructor(user, userConnections) {
        this.user = user;
        this.userConnections = userConnections;
    }

    addConnection(connection) {

        if (connectionDB.getConnection(connection.getConnection().getID()) == -1) {
            return -1;                  //connection doesn't exist in database
        }
        for (conn of userConnections) {
            if (conn.getConnection().getID() == connection.getConnection().getID()) {
                return 0;               //connection already exists in user's list
            }
        }
        userConnections.push(connection);
        return 1;                       //connection successfully added to the user's list
    }

    removeConnection(connection) {
        for (let i = 0; i < userConnections.length; i++) {
            if (userConnections[i].getConnection().getID() == connection.getID()) {
                this.userConnections.splice(i, 1);
                return this.userConnections;        //removed the connection
            }
        }
    }

    updateRSVP(connection, rsvp) {
        for (conn of userConnections) {
            if (conn.getConnection().getID() == connection.getID()) {
                conn.setRSVP(rsvp);
                return 1;           //successfully changed rsvp
            }
        }
        return -1;                  //failed to find connection to update
    }

    getUserConnections() {
        return this.userConnections;
    }
}
module.exports = UserProfile;