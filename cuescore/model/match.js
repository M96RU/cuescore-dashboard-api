module.exports = class Match {

    // Context
    organization;
    event;
    draw;

    // Match
    id; // pk
    tournamentId; // pk of tournament
    status;
    round;
    playerAid; // pk of player
    playerBid; // pk of player
    scoreA;
    scoreB;
    raceTo;

    // Table
    tableId;
    tableName;

    starttime;
    stoptime;

    constructor(context, cuescore) {
        this.id = cuescore.matchId;
        this.tournamentId = cuescore.tournamentId;
        this.status = cuescore.matchstatus;
        this.round = cuescore.round;
        if (cuescore.playerA && cuescore.playerA.playerId) {
            this.playerAid = cuescore.playerA.playerId;
        }
        if (cuescore.playerB && cuescore.playerB.playerId) {
            this.playerBid = cuescore.playerB.playerId;
        }
        this.scoreA = cuescore.scoreA;
        this.scoreB = cuescore.scoreB;
        this.raceTo = cuescore.raceTo;

        if (cuescore.starttime) {
            this.starttime = new Date(cuescore.starttime);
        }
        if (cuescore.stoptime) {
            this.stoptime = new Date(cuescore.stoptime);
        }
        if (cuescore.table) {
            this.tableId = cuescore.table.tableId;
            this.tableName = cuescore.table.name;
        }

        if (context) {
            this.organization = context.organization;
            this.event = context.event;
            this.draw = context.draw;
        }
    }
}