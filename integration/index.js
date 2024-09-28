httpRequest = require('./../services/http-request');
Tournament = require('./model/tournament');
Match = require('./model/match');

const ids = [49128523, 46509868, 49439956, 49540879];

now = function () {
    return new Date().getTime();
}

// store the timestamp when integration begins to avoid duplicates
let started = 0;

let cpt = 0;
let response = undefined;
let tournaments = {};
let matches = {};

function everyTime() {
    cpt++;
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
    if (tournaments) {
        return '{"tournaments" : ' + JSON.stringify(tournaments) + ', "matches" : ' + JSON.stringify(matches) + '}';
        // return  response.tournamentId;
    }
    return '{"cpt": "' + cpt + '"}';
};
