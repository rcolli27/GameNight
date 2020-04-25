class connection {
    constructor(ID, type, game, details, date, time, location, userID) {
        this.ID = ID;
        this.type = type;
        this.game = game;
        this.details = details;
        this.date = date;
        this.time = time;
        this.location = location;
        this.userID = userID;
    }
    getID() {
        return this.ID;
    }
    gettype() {
        return this.type;
    }
    getgame() {
        return this.game;
    }
    getdetails() {
        return this.details;
    }
    getdate() {
        return this.date;
    }
    gettime() {
        return this.time;
    }
    getLocation() {
        return this.location;
    }
    getUserID() {
        return this.userID;
    }

    setID(ID) {
        this.ID = ID;
    }
    settype(type) {
        this.type = type;
    }
    setgame(game) {
        this.game = game;
    }
    setdetails(details) {
        this.details = details;
    }
    setdate(date) {
        this.date = date;
    }
    settime(time) {
        this.time = time;
    }
    setLocation(location) {
        this.location = location;
    }
    setUserID(userID) {
        this.userID = userID;
    }
}

module.exports = connection;