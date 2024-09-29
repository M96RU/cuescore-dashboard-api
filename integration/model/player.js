module.exports = class Player {
    id; // pk
    name;
    firstname;
    lastname;

    constructor(cuescore) {
        this.id = cuescore.playerId;
        this.name = cuescore.name;
        this.firstname = cuescore.firstname;
        this.lastname = cuescore.lastname;
    }
}
