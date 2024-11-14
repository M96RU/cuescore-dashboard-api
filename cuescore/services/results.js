Match = require('../model/match');
Player = require('../model/player');

const tournamentService = require('../services/tournament');

const fs = require("fs");

const tournaments = require('./../data/tournaments').getData();

const results = {
    tournaments: {},
    matches: {},
    players: {}
}

for (let tournament of tournaments.filter(t => !t.live)) {

    results.tournaments[tournament.id] = tournament;

    const resultTournament = getTournament(tournament);

    for (let match of Object.values(resultTournament.matches)) {
        results.matches[match.id] = match;
    }

    for (let player of Object.values(resultTournament.players)) {
        results.players[player.id] = player;
    }
}

function getTournament(tournament) {

    const results = {
        matches: {},
        players: {}
    };

    if (tournament) {
        const path = tournamentService.getFolder(tournament) + '/' + tournament.id + '.json';

        try {
            const data = fs.readFileSync(path, 'utf8');
            const json = JSON.parse(data);

            const timezone = json['timezone'];

            for (let cuescore of json.matches) {
                const match = new Match(cuescore, timezone);
                results.matches[match.id] = match;

                if (match.playerAid) {
                    const player = new Player(cuescore.playerA);
                    results.players[player.id] = player;
                }
                if (match.playerBid) {
                    const player = new Player(cuescore.playerB);
                    results.players[player.id] = new Player(player);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    return results;
}

module.exports.getData = () => {
    return results;
};

module.exports.getTournament = (tournament) => {

    if (!tournament) {
        return {
            matches: {},
            players: {}
        };
    }

    return getTournament(tournament);
}
