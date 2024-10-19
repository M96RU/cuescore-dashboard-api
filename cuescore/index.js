const proxy = require('./proxy');
const results = require('./results');
const moment = require("moment-timezone");

const baseUrl = '/api/cuescore'

const matchIsLive = (match) => {
    return match && match.status === 'playing' && match.tableId;
}

const matchIsPlanned = (match) => {
    return match && match.tableId && match.status !== 'finished' && match.status !== 'playing';
}

const matchJustFinished = (match) => {
    if (!match || match.status !== 'finished' || !match.stoptime) {
        return false;
    }
    return moment().diff(match.stoptime) < 300000; // 5 minutes x 60 seconds x 1000 ms
}

const organizations = [
    {
        id: "ffb",
        name: "Fédération Française de Billard",
        url: "https://img.cuescore.com/image/6/2/64c15e92da31b5e500b6abb0d14be0dc.png",
        display: true
    }, {
        id: "lbara",
        name: "Ligue Auvergne-Rhône-Alpes",
        url: "https://img.cuescore.com/image/0/2/0338989cafdd922c63cb57acd7be0329.png",
        display: true
    }
];

const init = (app) => {

    app.get(baseUrl + '/organizations', async (req, res) => {
        res.send({
            organizations: organizations
        });
    });

    app.get(baseUrl + '/live', async (req, res) => {

        // keep last match per table
        const liveMatches = {};
        const upcomingMatches = {};
        const finishedMatches = {};

        const live = {
            organisations: organizations,
            matches: []
        }
        const data = await proxy.getData();

        for (let match of Object.values(data.matches).filter(m => !req.query.organization || req.query.organization === m.organization)) {

            if (match.playerAid) {
                match['playerA'] = data.players[match.playerAid];
                delete match.playerAid;
            }
            if (match.playerBid) {
                match['playerB'] = data.players[match.playerBid];
                delete match.playerBid;
            }

            if (matchIsLive(match)) {
                liveMatches[match.tableId] = match;

            } else if (matchIsPlanned(match)) {
                upcomingMatches[match.tableId] = match;
            } else if (matchJustFinished(match)) {
                if (match.tableId) {
                    finishedMatches[match.tableId] = match;
                }
            }
        }

        for (let match of Object.values(upcomingMatches).filter(m => !liveMatches[m.tableId])) {
            liveMatches[match.tableId] = match;
        }
        for (let match of Object.values(finishedMatches).filter(m => !liveMatches[m.tableId])) {
            liveMatches[match.tableId] = match;
        }

        live.matches = Object.values(liveMatches);
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
