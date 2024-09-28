module.exports = class Tournament {
    id;
    name;
    url;
    version;

    constructor(tournament) {
        this.id = tournament.tournamentId;
        this.name = tournament.name;
        this.url = tournament.url;
        this.version = new Date();
    }
}