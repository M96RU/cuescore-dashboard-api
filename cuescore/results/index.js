Match = require('./../model/match');
Player = require('./../model/player');

const fs = require("fs");

const results = [
    {
        id: '45838186',
        organization: 'ffb',
        event: 1,
        type: 'bbm',
        local: 'true'
    }, {
        id: '45853384',
        organization: 'ffb',
        event: 1,
        type: 'women',
        local: 'true'
    }, {
        id: '45853969',
        organization: 'ffb',
        event: 1,
        type: 'junior',
        local: 'true'
    }, {
        id: '45870364',
        organization: 'ffb',
        event: 1,
        type: 'espoir',
        local: 'true'
    }, {
        id: '45870379',
        organization: 'ffb',
        event: 1,
        type: 'veteran',
        local: 'true'
    }, {
        id: '49086748',
        organization: 'ffb',
        event: 1,
        type: 'mixte_a',
        local: 'true'
    }, {
        id: '49369981',
        organization: 'ffb',
        event: 1,
        type: 'mixte_b',
        local: 'true'
    }
]

const matches = []
let players = {};

for (let result of results) {
    const path = __dirname + '/' + result.organization + '/' + result.event + '/' + result.id + '.json';
    try {
        const data = fs.readFileSync(path, 'utf8');
        const json = JSON.parse(data);

        for (let cuescore of json.matches) {
            const match = new Match(cuescore);
            matches.push(match);

            if (match.playerAid) {
                const player = new Player(cuescore.playerA);
                players[player.id] = player;
            }
            if (match.playerBid) {
                const player = new Player(cuescore.playerB);
                players[player.id] = new Player(player);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports.getMatches = () => {
    return matches;
};

module.exports.getPlayers = () => {
    return Object.values(players);
};
