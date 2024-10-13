Match = require('./../model/match');
Player = require('./../model/player');

const fs = require("fs");

const results = [
    {
        id: '45838186',
        organization: 'ffb',
        event: 1,
        draw: 'bbm'
    }, {
        id: '45853384',
        organization: 'ffb',
        event: 1,
        draw: 'women'
    }, {
        id: '45853969',
        organization: 'ffb',
        event: 1,
        draw: 'junior'
    }, {
        id: '45870364',
        organization: 'ffb',
        event: 1,
        draw: 'espoir'
    }, {
        id: '45870379',
        organization: 'ffb',
        event: 1,
        draw: 'veteran'
    }, {
        id: '49086748',
        organization: 'ffb',
        event: 1,
        draw: 'mixte_a'
    }, {
        id: '49369981',
        organization: 'ffb',
        event: 1,
        draw: 'mixte_b'
    }
];

const tournaments = {};
const matches = {};
let players = {};

for (let result of results) {

    tournaments[result.id] = result;

    const path = __dirname + '/' + result.organization + '/' + result.event + '/' + result.id + '.json';

    try {
        const data = fs.readFileSync(path, 'utf8');
        const json = JSON.parse(data);

        for (let cuescore of json.matches) {
            const match = new Match(cuescore);
            matches[match.id] = match;

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

module.exports.getData = () => {
    return {
        tournaments: tournaments,
        matches: matches,
        players: players
    };
};
