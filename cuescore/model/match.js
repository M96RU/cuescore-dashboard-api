const moment = require('moment-timezone');

module.exports = class Match {

    // Labels
    organization;
    draw;
    duration;
    scorerUrl;

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
    roundName;

    // Table
    tableId;
    tableName;

    starttime;
    stoptime;

    constructor(cuescore, timezone) {
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
        this.roundName = cuescore.roundName;

        if (cuescore.starttime) {
            if (timezone) {
                this.starttime = moment.tz(cuescore.starttime, timezone).utc();
            } else {
                this.starttime = moment(cuescore.starttime);
            }
        }
        if (cuescore.stoptime) {
            if (timezone) {
                this.stoptime = moment.tz(cuescore.stoptime, timezone).utc();
            } else {
                this.stoptime = moment(cuescore.stoptime);
            }
        }
        if (cuescore.table) {
            this.tableId = cuescore.table.tableId;
            this.tableName = cuescore.table.name;
        }
    }
}