const cache = require("map-expire");
Match = require('./../model/match');
Player = require('./../model/player');

const draws = [
    {
        id: '49072816',
        organization: 'lbara',
        event: 1,
        type: 'prestige',
        local: 'true'
    }, {
        id: '50312830',
        organization: 'lbara',
        event: 1,
        type: 'mixte',
        local: 'true'
    }, {
        id: '50414236',
        organization: 'lbara',
        event: 1,
        type: 'women',
        local: 'true'
    }, {
        id: '50414236',
        organization: 'lbara',
        event: 1,
        type: 'juniors',
        local: 'true' // pas de tables
    }, {
        id: '50508148',
        organization: 'lbara',
        event: 1,
        type: 'veteran',
        local: 'true'
    }
]

/*
    }, {
        id: '50508121',
        organization: 'lbara',
        event: 1,
        type: 'mixte',
        local: 'true'
    }, {
        id: '50373061',
        organization: 'lbara',
        event: 1,
        type: 'mixte',
        local: 'true'
 */

const duration = 25 * 1000; // 25 seconds

async function getProxy () {

    const proxy = {
        matches: {},
        players: {}
    };

    for (let draw of draws) {
        const url = 'https://api.cuescore.com/tournament/?id=' + draw.id;
        const response = await fetch(url);
        const json = await response.json();

        for (let cuescore of json.matches) {
            const match = new Match(cuescore);
            proxy.matches[match.id] = match;

            if (match.playerAid) {
                const player = new Player(cuescore.playerA);
                proxy.players[player.id] = player;
            }
            if (match.playerBid) {
                const player = new Player(cuescore.playerB);
                proxy.players[player.id] = new Player(player);
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
