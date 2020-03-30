var connectionDB = require("../utilities/connectionDB");
var UserConnection = require('./userConnection');

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
        for (let i = 0; i < userConnections.length; i++) {
            if (userConnections[i].getConnection().ID == connection.ID) {
                this.userConnections.splice(i, 1);
                return this.userConnections;        //removed the connection
            }
        }
    }

    updateRSVP(connection, rsvp) {
        for (conn of userConnections) {
            if (conn.connection.ID == connection.ID) {
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