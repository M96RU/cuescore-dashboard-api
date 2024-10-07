const results = require('./results');

const integration = require('./../integration');

const fs = require("fs");

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
//        const matches = await integration.getMatches();
        res.send(results.getMatches());
    });
    app.get('/api/cuescore/players', async (req, res) => {
        res.send(results.getPlayers());
    });
}

module.exports.init = init;
