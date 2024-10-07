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

results.forEach(config => {
    const path = __dirname + '/' + config.organization + '/' + config.event + '/' + config.id + '.json';
    fs.readFile(path, (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        const json = JSON.parse(data);
        console.log(json.matches);
        matches.push(...json.matches);
    });
});

module.exports.getMatches = () => {
    return matches;
};
