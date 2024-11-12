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
    order;
    roundName;
    starttime;
    stoptime;

    // Players
    playerAid; // pk of player
    playerBid; // pk of player

    // Score
    scoreA;
    scoreB;
    raceTo;

    // Players status
    statusA;
    statusB;

    // Table
    tableId;
    tableName;

    constructor(cuescore, timezone) {
        this.id = cuescore['matchId'];
        this.tournamentId = cuescore.tournamentId;
        this.status = cuescore['matchstatus'];
        this.round = cuescore.round;
        this.order = cuescore['matchno'];
        if (cuescore.playerA && cuescore.playerA['playerId']) {
            this.playerAid = cuescore.playerA['playerId'];
        }
        if (cuescore.playerB && cuescore.playerB['playerId']) {
            this.playerBid = cuescore.playerB['playerId'];
        }
        switch (cuescore['penalty']) {
            case 1: // Forfeit
            case 4: // Disqualified
            case 16: // Abandoned
                this.statusA = 'DIS';
                break;
            case 2: // Forfeit
            case 8: // Disqualified
            case 32: // Disqualified
                this.statusB = 'DIS';
                break;
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