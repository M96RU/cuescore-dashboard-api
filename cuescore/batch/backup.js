const fs = require("fs");

const tournaments = require('../data/tournaments.js').getData();

for (let tournament of tournaments.filter(t => t.live)) {

    const folder = __dirname + '/../backup/' + tournament.organization + '/' + tournament.event;
    const path = folder + '/' + tournament.id + '.json';

    if (!fs.existsSync(folder)) {
        console.log('Creating folder ' + folder);
        fs.mkdirSync(folder, {recursive: true});
    }

    const url = 'https://api.cuescore.com/tournament/?id=' + tournament.id;
    const options = {
        headers: {
            'Cookie': 'locale=fr_FR.utf8;'
        }
    };

    console.log('Retrieve url ' + url + ' into ' + path);

    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            const status = json['status'];
            if (status !== 'Terminé') {
                console.warn('WARN: Tournament ' + tournament.id + ' : status not finished');
            }

            const matches = json['matches'];
            if (matches && matches.length > 0) {
                return json;
            }

            console.warn('WARN: Tournament ' + tournament.id + ' : no matches found');
            return undefined;
        })
        .then(json => {
            if (json) {
                const data = JSON.stringify(json, null, 2);
                fs.writeFileSync(path, data, {
                    encoding: 'utf8'
                });
            }
        });
}
