class User {
    constructor(userID, first, last, email) {
        this.userID = userID;
        this.first = first;
        this.last = last;
        this.email = email;
    }
    getID() {
        return this.userID;
    }
    getFirst() {
        return this.first;
    }
    getLast() {
        return this.last;
    }
    getEmail() {
        return this.email;
    }
    setName(first, last) {
        this.first = first;
        this.last = last;
    }
    setEmail(email) {
        this.email = email;
    }
}

module.exports = User;