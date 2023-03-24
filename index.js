const express = require("express");
const app = express();
app.use(express.json());

const cache = require('map-expire');

const duration = 10 * 60 * 1000; // 10 minutes

app.get('/', (req, res) => {
    res.send("Express on Vercel");
});

app.get('/api/match/:id', (req, res) => {
    const matchId = '' + req.params.id;
    const match = cache.get(matchId);
    res.send(match);
});

app.post('/api/match', function (req, res) {
    req.body.id = '' + req.body.id;
    cache.set(req.body.id, req.body, duration);
    res.send(req.body);
})

app.listen(5000, () => {
    console.log("Running on port 5000.");
});
// Export the Express API
module.exports = app;
