class connection {
    constructor(ID, type, game, name, details, date, time) {
        this.ID = ID;
        this.type = type;
        this.game = game;
        this.name = name;
        this.details = details;
        this.date = date;
        this.time = time;
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
    getname() {
        return this.name;
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

    setID(ID) {
        this.ID = ID;
    }
    settype(type) {
        this.type = type;
    }
    setgame(game) {
        this.game = game;
    }
    setname(name) {
        this.name = name;
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
}

module.exports = connection;