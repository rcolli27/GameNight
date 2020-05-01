class User {
    constructor(userID, first, last, email, password) {
        this.userID = userID;
        this.first = first;
        this.last = last;
        this.email = email;
        this.password = password;
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
    getPassword() {
        return this.password;
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