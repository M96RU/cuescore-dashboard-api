const cache = require('map-expire');
Match = require('../model/match');
Player = require('../model/player');

const labelDraws = require('../label/draws.js');
const tournaments = require('../data/tournaments.js').getData();
const tablesService = require('../data/tables.js');

const computeDuration = {
    ffb: (match) => {
        return 0;
    },
    lbara: (match) => {
        if (!match || !match.raceTo) {
            return 0;
        }
        if (match.raceTo >= 5) {
            return 105; // 1h45
        }
        if (match.raceTo >= 4) {
            return 75; // 1h15
        }
        return 60; // 1h by default
    },
    lbara_district: (match) => {
        return 60; // 1h by default
    }
}


const duration = 25 * 1000; // 25 seconds

async function getProxy() {

    const proxy = {
        tournaments: {},
        matches: {},
        players: {}
    };

    for (let tournament of tournaments.filter(t => t.live)) {
        const url = 'https://api.cuescore.com/tournament/?id=' + tournament.id;
        const response = await fetch(url, {
            headers: {
                'Cookie': 'locale=fr_FR.utf8;'
            }
        });
        const json = await response.json();

        const timezone = json['timezone'];

        for (let cuescore of json.matches) {
            const match = new Match(cuescore, timezone);
            proxy.matches[match.id] = match;

            if (match.playerAid) {
                const player = new Player(cuescore.playerA);
                proxy.players[player.id] = player;
            }
            if (match.playerBid) {
                const player = new Player(cuescore.playerB);
                proxy.players[player.id] = new Player(player);
            }

            match.organization = tournament.organization;
            match.draw = labelDraws.getLabel(tournament.draw);

            match.duration = computeDuration[match.organization] ? computeDuration[match.organization](match) : 0;

            const table = tablesService.getByTableId(match.tableId);
            if (table) {
                match.scorerUrl = 'https://cuescore.com/scoreboard/?code=' + table.code;
            }
        }
    }
    return proxy;
}

module.exports.getData = async () => {

    const cached = cache.get("proxy");
    if (cached) {
        return cached;
    }

    console.log('Refreshing proxy cache...');
    const proxy = await getProxy();
    cache.set("proxy", proxy, duration);

    console.log('Refreshing proxy cache OK');
    return proxy;
}
