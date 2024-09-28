
var integration = require('./integration');

const init = (app) => {
    app.get('/api/cuescore', (req, res) => {
        res.send(integration.getData());
    });
}

module.exports.init = init;
