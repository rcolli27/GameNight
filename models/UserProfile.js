var connectionDB = require("../utilities/connectionDB");
var UserConnection = require('./userConnection');
var Connection = require("./Connection");

class UserProfile {
    constructor(user, userConnections) {
        this.user = user;
        this.userConnections = userConnections;
    }

    addConnection(connection, rsvp) {

        for (conn of this.userConnections) {
            if (conn.connection.ID == connection.ID) {
                return 0;               //connection already exists in user's list
            }
        }
        this.userConnections.push(new UserConnection(connection, rsvp));
        return 1;                       //connection successfully added to the user's list
    }

    removeConnection(connection) {
        for (let i = 0; i < this.userConnections.length; i++) {
            if (this.userConnections[i].connection.ID == connection.connection.ID) {
                this.userConnections.splice(i, 1);
                return this.userConnections;        //removed the connection
            }
        }
    }

    updateRSVP(connection, rsvp) {
        for (conn of this.userConnections) {
            if (conn.connection.ID == connection.ID) {
                conn = new UserConnection(new Connection(conn.connection.ID, conn.connection.type, conn.connection.game, conn.connection.details, conn.connection.time, conn.connection.location, conn.connection.userID), rsvp);
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