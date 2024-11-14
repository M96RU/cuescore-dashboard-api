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

async function getCachedTournament(tournament) {
    const key = 'tournament#' + tournament.id;
    const cached = cache.get(key);
    if (cached) {
        return cached;
    }

    console.log('Refreshing proxy cache ' + key + '...');
    const proxy = await getTournament(tournament);
    cache.set(key, proxy, duration);

    console.log('Refreshing proxy cache ' + key + ' OK');
    return proxy;

}

async function getTournament(tournament) {

    const proxy = {
        matches: {},
        players: {}
    };

    if (tournament) {
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
            match.draw = tournament.draw;

            match.duration = computeDuration[match.organization] ? computeDuration[match.organization](match) : 0;

            const table = tablesService.getByTableId(match.tableId);
            if (table) {
                match.scorerUrl = 'https://cuescore.com/scoreboard/?code=' + table.code;
            }
        }

        if (Object.values(proxy.matches).length === 0) {
            const url = 'https://api.cuescore.com/tournament/?participants=Participants+list&id=' + tournament.id;

            const response = await fetch(url, {
                headers: {
                    'Cookie': 'locale=fr_FR.utf8;'
                }
            });
            const json = await response.json();

            for (let cuescore of json) {
                const player = new Player(cuescore);
                proxy.players[player.id] = new Player(player);
            }
        }
    }

    return proxy;
}

async function getProxy() {

    const proxy = {
        tournaments: {},
        matches: {},
        players: {}
    };

    for (let tournament of tournaments.filter(t => t.live)) {

        const tournamentProxy = await getCachedTournament(tournament);

        if (tournamentProxy) {
            for (let match of Object.values(tournamentProxy.matches)) {
                proxy.matches[match.id] = match;
            }
            for (let player of Object.values(tournamentProxy.players)) {
                proxy.players[player.id] = player;
            }
        }
    }
    return proxy;
}

module.exports.getData = async () => {
    return await getProxy();
}

module.exports.getTournament = async (tournament) => {

    if (!tournament) {
        return {
            matches: {},
            players: {}
        };
    }

    return getCachedTournament(tournament);
}
