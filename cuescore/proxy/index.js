const cache = require('map-expire');
Match = require('./../model/match');
Player = require('./../model/player');

const labels = {
    // Organizations
    'ffb' : 'FF Billard',
    'lbara' : 'LBARA',

    // Common draws
    'mixte': 'Mixte',
    'women' : 'Féminin',
    'juniors': 'Jeunes',

    // FFB draws
    'bbm' : 'BBM',

    // LBARA draws
    'prestige': 'Prestige',


}

const tournaments = [
    {
        id: '50054326',
        organization: 'lbara',
        event: 1,
        draw: 'prestige',
        live: true

    }
];

/*
    }, {
        id: '47631238',
        organization: 'lbara',
        event: 1,
        draw: 'mixte',
        live: true
    }, {
        id: '47643448',
        organization: 'lbara',
        event: 1,
        draw: 'women',
        live: true
    }, {
        id: '47646070',
        organization: 'lbara',
        event: 1,
        draw: 'juniors',
        live: true
    }, {
        id: '47646256',
        organization: 'ffb',
        event: 1,
        draw: 'bbm',
        live: true


    }, {
        id: '47646256',
        organization: 'ffb',
        event: 1,
        draw: 'bbm',
        live: true
    }, {
        id: '49870510',
        organization: 'ffb',
        event: 1,
        draw: 'women',
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

            match.organization = labels[tournament.organization] ?? tournament.organization;
            match.draw = labels[tournament.draw] ?? tournament.draw;
            match.duration = 120
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
