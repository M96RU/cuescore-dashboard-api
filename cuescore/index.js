const proxy = require('./proxy');
const results = require('./results');

const baseUrl = '/api/cuescore'

const init = (app) => {

    app.get(baseUrl + '/matches', async (req, res) => {
        // live: match.status === 'playing'
        const matches = await proxy.getMatches();
        res.send({
            proxy: matches,
            matches: results.getMatches()
        });
    });

    app.get(baseUrl + '/players', async (req, res) => {
        const players = await proxy.getPlayers();
        res.send({
            proxy: players,
            results: results.getPlayers()
        });
    });
}

module.exports.init = init;
