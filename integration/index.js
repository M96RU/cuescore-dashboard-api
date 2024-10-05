httpRequest = require('./../services/http-request');
Tournament = require('./model/tournament');
Match = require('./model/match');
Player = require('./model/player');
const cache = require('map-expire');

const ids = [44493889, 48138685, 49221085, 49636825, 49684933];

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

// init at startup
everyTime();

// then schedule update every 30 seconds
// setInterval(everyTime, 30 * 1000);

module.exports.getData = () => {
    return {
        tournaments: tournaments,
        matches: matches,
        players: players
    };
};

module.exports.test = async () => {
    const cached = cache.get("49944664");
    if (cached) {
        return cached;
    }
    const response = await fetch('https://api.cuescore.com/tournament/?id=49944664');
    const toCache = await response.json();
    const duration = 30 * 1000; // 10 seconds
    cache.set("49944664", toCache, duration);
    return toCache;
}
