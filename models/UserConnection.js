class UserConnection {
    constructor(connection, rsvp) {
        this.connection = connection;
        this.rsvp = rsvp;
    }
    getConnection() {
        return this.connection;
    }
    getRSVP() {
        return this.rsvp;
    }
    setRSVP(rsvp) {
        this.rsvp = rsvp;
    }
}

module.exports = UserConnection;