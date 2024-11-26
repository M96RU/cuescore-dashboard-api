const Rank = require("../model/rank");

const WALK_OVER_PLAYER_ID = 1000615;

module.exports.getFolder = (tournament) => {
    return __dirname + '/../backup/' + tournament.organization + '/' + tournament.event;
};

filterRankingMatches = (match) => {
    return match.playerAid !== WALK_OVER_PLAYER_ID && match.playerBid !== WALK_OVER_PLAYER_ID;
}

module.exports.getRanking = (matches, rankingPoints) => {

    const copyRankingPoints = [...rankingPoints];

    // The final round will be used to give points for both players of final match
    let finalRound = 0;

    const matchesPerRound = {};
    for (let match of matches.filter(filterRankingMatches)) {
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

            let winner = undefined;
            let loser = undefined;

            if (match.scoreA > match.scoreB) {
                winner = playerA;
                loser = playerB;
            } else if (match.scoreB > match.scoreA) {
                winner = playerB;
                loser = playerA;
            }

            if (winner) {
                if (isFinalRound) {
                    winner.order = 1;
                }
                if (winner.points === undefined) {
                    winner.points = winnerPoints;
                }
                ranking[winner.playerId] = winner;
            }

            if (loser) {
                if (loser.points === undefined) {
                    loser.points = loserPoints;
                }
                ranking[loser.playerId] = loser;
            }

            if (winner === undefined && loser === undefined) {
                if (playerA.points === undefined) {
                    playerA.points = match.statusA ? 0 : loserPoints;
                    ranking[playerA.playerId] = playerA;
                }
                if (playerB.points === undefined) {
                    playerB.points = match.statusB ? 0 : loserPoints;
                    ranking[playerB.playerId] = playerB;
                }
            }
        }
    }

    return ranking;
};
