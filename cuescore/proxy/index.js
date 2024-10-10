const cache = require("map-expire");
Match = require('./../model/match');
Player = require('./../model/player');

const tournaments = [
    {
        id: '38686123',
        organization: 'lbara',
        event: 1,
        type: 'prestige',
        live: true
    }

];

/*
    }, {
        id: '46620286',
        organization: 'lbara',
        event: 1,
        type: 'mixte',
        live: true
    }, {
        id: '47512555',
        organization: 'lbara',
        event: 1,
        type: 'women',
        live: true
    }, {
        id: '49853869',
        organization: 'lbara',
        event: 1,
        type: 'juniors',
        live: true
    }, {
        id: '38686123',
        organization: 'lbara',
        event: 1,
        type: 'other',
        live: true

 */

const duration = 25 * 1000; // 25 seconds

async function getProxy() {

    const proxy = {
        tournaments: {},
        matches: {},
        players: {}
    };

    for (let tournament of tournaments) {
        const url = 'https://api.cuescore.com/tournament/?id=' + tournament.id;
        const response = await fetch(url);
        const json = await response.json();

        for (let cuescore of json.matches) {
            const match = new Match(tournament, cuescore);
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
