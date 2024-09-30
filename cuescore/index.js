const integration = require('./../integration');

const init = (app) => {

    app.get('/api/cuescore', (req, res) => {
        const data = integration.getData();
        res.send({
            tournaments: Object.values(data.tournaments),
            players: Object.values(data.players),
        });
    });

    app.get('/api/cuescore/live', (req, res) => {
        const data = integration.getData();
        res.send({
            matches: Object.values(data.matches).filter(match => match.status === 'playing'),
        });
    });
}

module.exports.init = init;
