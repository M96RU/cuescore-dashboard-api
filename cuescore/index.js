const proxy = require('./proxy');
const results = require('./results');

const baseUrl = '/api/cuescore'

const init = (app) => {

    app.get(baseUrl + '/matches', async (req, res) => {
        // live: match.status === 'playing'

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
