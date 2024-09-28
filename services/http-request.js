const https = require('https');

module.exports = function (url, callback) {

    https.get(url, (resp) => {
        let data = '';

        // Un morceau de réponse est reçu
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // La réponse complète à été reçue. On affiche le résultat.
        resp.on('end', () => {
            // response = new Tournament (JSON.parse(data));
            callback(null, JSON.parse(data));
        });

    }).on("error", (err) => {
        const errorMessage = 'Error:' + err.message;
        console.info(errorMessage);
        callback(errorMessage);
    });
};
