const Rank = require("../model/rank");

module.exports.getFolder = (tournament) => {
    return __dirname + '/../backup/' + tournament.organization + '/' + tournament.event;
};

module.exports.getRanking = (matches, rankingPoints) => {

    const copyRankingPoints = [...rankingPoints];

    // The final round will be used to give points for both players of final match
    let finalRound = 0;

    const matchesPerRound = {};
    for (let match of matches) {
        finalRound = match.round > finalRound ? match.round : finalRound;
        const matchesOfRound = matchesPerRound[match.round] ?? [];
        matchesOfRound.push(match)
        matchesPerRound[match.round] = matchesOfRound;
    }

    const ranking = {};

    for (let round of Object.keys(matchesPerRound).sort((r1, r2) => r2 - r1)) {

        const matchesOfRound = matchesPerRound[round] ?? [];

        const isFinalRound = +round === finalRound;
        const winnerPoints = isFinalRound && copyRankingPoints.length > 0 ? copyRankingPoints.shift() : 0;
        const loserPoints = copyRankingPoints.length > 0 ? copyRankingPoints.shift() : 0;

        for (let match of matchesOfRound) {
            const playerA = ranking[match.playerAid] ?? new Rank();
            playerA.playerId = match.playerAid;
            playerA.won += match.scoreA;
            playerA.lost += match.scoreB;
            playerA.gameAverage = playerA.won - playerA.lost;


            const playerB = ranking[match.playerBid] ?? new Rank();
            playerB.playerId = match.playerBid;
            playerB.won += match.scoreB;
            playerB.lost += match.scoreA;
            playerB.gameAverage = playerB.won - playerB.lost;

            const winner = match.scoreA > match.scoreB ? playerA : playerB;
            const loser = match.scoreA > match.scoreB ? playerB : playerA;

            if (winner.points === undefined) {
                winner.points = winnerPoints;
            }
            if (loser.points === undefined) {
                loser.points = loserPoints;
            }

            ranking[winner.playerId] = winner;
            ranking[loser.playerId] = loser;
        }
    }

    return ranking;
};
