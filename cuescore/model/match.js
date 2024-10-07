module.exports = class Match {
    id; // pk
    tournamentId; // pk of tournament
    status;
    round;
    playerAid; // pk of player
    playerBid; // pk of player
    scoreA;
    scoreB;
    raceTo;

    constructor(cuescore) {
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
    }
}