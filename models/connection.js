class connection {
    constructor(ID, type, game, details, date, location) {
        this.ID = ID;
        this.type = type;
        this.game = game;
        this.details = details;
        //split datetime to show date then time
        let datetime = date.split("T");
        this.date = datetime[0];
        //split time to show hour and minute to swap from 24hr to 12hr clock
        let temptime = datetime[1].split(":");
        if (parseInt(temptime[0]) == 0) {
            this.time = '12:' + temptime[1] + 'AM';
        } else if (parseInt(temptime[0]) > 0 && parseInt(temptime[0]) < 12) {
            this.time = datetime[1] + 'AM'
        }
        else if (parseInt(temptime[0]) == 12) {
            this.time = datetime[1] + 'PM';
        } else {
            this.time = temptime[0] - 12 + ':' + temptime[1] + 'PM';
        }
        this.location = location;
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
}

module.exports = connection;