const proxy = require('./proxy');
const results = require('./results');

const init = (app) => {

    app.get('/api/cuescore', (req, res) => {
        const response = {
            tournaments: [
                {
                    id: "49944664",
                    organization: "lbara",
                    type: "mixte"
                }, {
                    id: "49997359",
                    organization: "lbara",
                    type: "women"
                }
            ]
        }
        res.send(response);
    });

    app.get('/api/cuescore/live', (req, res) => {
        const data = integration.getData();
        res.send({
            matches: Object.values(data.matches).filter(match => match.status === 'playing'),
        });
    });

    app.get('/api/cuescore/matches', async (req, res) => {
        const matches = await proxy.getMatches();
        res.send({
            proxy: matches,
            matches: results.getMatches()
        });
    });
    app.get('/api/cuescore/players', async (req, res) => {
        const players = await proxy.getPlayers();
        res.send({
            proxy: players,
            results: results.getPlayers()
        });
    });
}

module.exports.init = init;
