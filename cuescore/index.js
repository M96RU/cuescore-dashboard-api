const proxy = require('./proxy');
const results = require('./results');

const baseUrl = '/api/cuescore'

const matchIsLive = (match) => {
    return match && match.status === 'playing';
}

const matchJustFinished = (match) => {
    if (!match || match.status !== 'finished' || !match.stoptime) {
        return false;
    }
    return true;
}

const organizations = [
    {
        id: "ffb",
        name: "FFB"
    }, {
        id: "lbara",
        name: "LBARA"
    }
];

const init = (app) => {

    app.get(baseUrl + '/live', async (req, res) => {

        // keep last match per table
        const tables = {};

        const live = {
            organisations: organizations,
            matches: []
        }
        const data = await proxy.getData();

        for (let match of Object.values(data.matches)) {

            if (match.playerAid) {
                match['playerA'] = data.players[match.playerAid];
                delete match.playerAid;
            }
            if (match.playerBid) {
                match['playerB'] = data.players[match.playerBid];
                delete match.playerBid;
            }

            if (matchIsLive(match)) {
                live.matches.push(match);
                if (match.tableId) {
                    tables[match.tableId] = match;
                }

            } else if (matchJustFinished(match)) {
                if (match.tableId) {
                    const matchOnTable = tables[match.tableId];
                    if (!matchOnTable || !matchIsLive(matchOnTable) && match.stoptime > matchOnTable.stoptime) {
                        tables[match.tableId] = match;
                    }
                }
            }
        }

        for (let match of Object.values(tables).filter(match => !matchIsLive(match))) {
            live.matches.push(match);
        }

        res.send(live);
    });

    app.get(baseUrl + '/matches', async (req, res) => {
        const resultsData = results.getData();
        const matches = resultsData.matches;
        const data = await proxy.getData();

        for (let match of Object.values(data.matches)) {
            matches[match.id] = match;
        }

        res.send(Object.values(matches));
    });

    app.get(baseUrl + '/players', async (req, res) => {
        const resultsData = results.getData();
        const players = resultsData.players;
        const data = await proxy.getData();

        for (let player of Object.values(data.players)) {
            players[player.id] = player;
        }

        res.send(Object.values(players));
    });
}

module.exports.init = init;
