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
        this.status = cuescore.status;
        this.round = cuescore.round;
        this.playerAid = cuescore.playerA?.playerId;
        this.playerBid = cuescore.playerB?.playerId;
        this.playerAscore = cuescore.scoreA;
        this.playerBscore = cuescore.scoreB;
        this.raceTo = cuescore.raceTo;
    }
}