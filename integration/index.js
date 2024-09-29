httpRequest = require('./../services/http-request');
Tournament = require('./model/tournament');
Match = require('./model/match');
Player = require('./model/player');

const ids = [49128523, 46509868, 49439956, 49540879];

now = function () {
    return new Date().getTime();
}

// store the timestamp when integration begins to avoid duplicates
let started = 0;

let players = {};
let tournaments = {};
let matches = {};

function everyTime() {
    if (started > 0 && Math.round(now() - started) < 60000) {
        console.info('Integration in progress since ' + started + ' - will be retry when previous finish or 60s');
    } else {
        started = now();
        console.info('Integration begins at ' + started);

        let nbTournaments = ids.length;

        ids.forEach(id => {
            const url = 'https://api.cuescore.com/tournament/?id=' + id;
            console.info('Calling ' + url);
            httpRequest(url, (err, res) => {
                if (res) {
                    const tournament = new Tournament(res);
                    tournament.url2 = url;
                    tournaments[tournament.id] = tournament;

                    if (res.matches && res.matches.length > 0) {
                        res.matches.forEach(cuescore => {

                            // // todo check walk over 1000615
                            if (cuescore.playerA && cuescore.playerA.playerId) {
                                const player = new Player(cuescore.playerA);
                                players[player.id] = player;
                            }
                            if (cuescore.playerB && cuescore.playerB.playerId) {
                                const player = new Player(cuescore.playerB);
                                players[player.id] = player;
                            }

                            const match = new Match(cuescore);
                            matches[match.id] = match;
                        });
                    }

                    console.info('Tournament integrated with success: ' + tournament.id);
                } else {
                    console.info('Tournament integration in error state: ' + url);
                }


                nbTournaments--;

                if (nbTournaments === 0) {
                    console.info('Integration ends at ' + now());
                    started = 0;
                }
            });
        });
    }
}

setInterval(everyTime, 30 * 1000); // 30 seconds

// init at startup
everyTime();

module.exports.getData = () => {
    return {
        tournaments: tournaments,
        matches: matches,
        players: players
    };
};
