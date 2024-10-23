const cache = require('map-expire');
Match = require('./../model/match');
Player = require('./../model/player');

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
    }
}

const labels = {

    // Common draws
    'mixte': 'Mixte',
    'women': 'Féminin',
    'veteran': 'Vétérans',
    'handi': 'Handi',

    // FFB draws
    'bbm': 'BBM',
    'espoir': 'Espoirs',
    'junior': 'Juniors',
    'mixte_a': 'Tableau A',
    'mixte_b': 'Tableau B',

    // LBARA draws
    'prestige': 'Prestige',
    'jeune': 'Jeunes',
}

const SCORER_CODE = {
    '12812770': '68537fab', // table 1
    '12812773': '8041d95e', // table 2
    '12812776': 'e241b2b7', // table 3
    '12812779': '2bf6b7e8', // table 4
    '12812782': '68a2b136', // table 5
    '12812785': 'e41be679', // table 6
    '12812797': 'de108f97', // table 7
    '12812800': '93c9d835', // table 8
    '12812803': '48d19094', // table 9
    '12812806': 'e91a16ed', // table 10
    '12812812': 'f9df0bac', // table 11
    '12812815': '53bb9a74', // table 12
    '12812818': '1e42635d', // table 13
    '12812824': 'a3c6665d', // table 14
    '12812827': '68354abc', // table 15
    '12812830': 'eb66652a', // table 16
    '12812833': '7f8283bc', // table 17
    '12812839': 'aab530ea', // table 18
    '12812842': 'b0d08428', // table 19
    '12812845': '8891f133', // table 20
}

const tournaments = [
    {
        id: '48186595',
        organization: 'lbara',
        event: 1,
        draw: 'prestige',
        live: true
    }, {
        id: '48186472',
        organization: 'lbara',
        event: 1,
        draw: 'mixte',
        live: true
    }, {
        id: '48186733',
        organization: 'lbara',
        event: 1,
        draw: 'women',
        live: true
    }, {
        id: '48186760',
        organization: 'lbara',
        event: 1,
        draw: 'veteran',
        live: true
    }, {
        id: '48186781',
        organization: 'lbara',
        event: 1,
        draw: 'jeune',
        live: true
    }, {
        id: '49859473',
        organization: 'ffb',
        event: 2,
        draw: 'bbm',
        live: true
    }, {
        id: '49940305',
        organization: 'ffb',
        event: 2,
        draw: 'espoir',
        live: true
    }, {
        id: '49938313',
        organization: 'ffb',
        event: 2,
        draw: 'junior',
        live: true
    }, {
        id: '49940263',
        organization: 'ffb',
        event: 2,
        draw: 'women',
        live: true
    }, {
        id: '49940362',
        organization: 'ffb',
        event: 2,
        draw: 'veteran',
        live: true
    }, {
        id: '50731213',
        organization: 'ffb',
        event: 2,
        draw: 'mixte_a',
        live: true
    }, {
        id: '50736109',
        organization: 'ffb',
        event: 2,
        draw: 'mixte_b',
        live: true
    }, {
        id: '49940395',
        organization: 'ffb',
        event: 2,
        draw: 'handi',
        live: true
    },
];

const duration = 25 * 1000; // 25 seconds

async function getProxy() {

    const proxy = {
        tournaments: {},
        matches: {},
        players: {}
    };

    for (let tournament of tournaments) {
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
            match.draw = labels[tournament.draw] ?? tournament.draw;

            match.duration = computeDuration[match.organization] ? computeDuration[match.organization](match) : 0;
            if (SCORER_CODE[match.tableId]) {
                match.scorerUrl = 'https://cuescore.com/scoreboard/?code=' + SCORER_CODE[match.tableId];
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
