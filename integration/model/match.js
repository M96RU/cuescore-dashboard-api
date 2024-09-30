module.exports = class Match {
    id; // pk
    tournamentId; // pk of tournament
    status;
    round;
    playerAid; // pk of player
    playerBid; // pk of player
    playerAscore;
    playerBscore;
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
        this.playerAscore = cuescore.scoreA;
        this.playerBscore = cuescore.scoreB;
        this.raceTo = cuescore.raceTo;
    }
}