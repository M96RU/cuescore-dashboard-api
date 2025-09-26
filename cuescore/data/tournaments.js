const tournaments = [

    // Ultimate qualifier
    {
        id: 34369354,
        organization: 'ultimate',
        event: 1,
        draw: 'other',
        live: true
    },

    // LBARA - TR1 - Bourg-en-Bresse
    {
        id: 62605819,
        organization: 'lbara',
        event: 1,
        draw: 'prestige',
        live: true
    }, {
        id: 62937217,
        organization: 'lbara',
        event: 1,
        draw: 'excellence',
        live: true
    }, {
        id: 62942887,
        organization: 'lbara',
        event: 1,
        draw: 'promotion',
        live: true
    }, {
        id: 63111664,
        organization: 'lbara',
        event: 1,
        draw: 'women',
        live: true
    }, {
        id: 63110329,
        organization: 'lbara',
        event: 1,
        draw: 'veteran',
        live: true
    }, {
        id: 63111988,
        organization: 'lbara',
        event: 1,
        draw: 'jeune',
        live: true
    }, {
        id: 64420330,
        organization: 'lbara',
        event: 1,
        draw: 'jeune_b',
        live: true
    },



    // FFB - TN1
    {
        id: 65725993,
        organization: 'ffb',
        event: 1,
        draw: 'bbm',
        live: true
    }, {
        id: 65725951,
        organization: 'ffb',
        event: 1,
        draw: 'national',
        live: true
    }, {
        id: 65725861,
        organization: 'ffb',
        event: 1,
        draw: 'women',
        live: true
    }, {
        id: 65725936,
        organization: 'ffb',
        event: 1,
        draw: 'veteran',
        live: true
    }, {
        id: 65722312,
        organization: 'ffb',
        event: 1,
        draw: 'junior',
        live: true
    }, {
        id: 65725849,
        organization: 'ffb',
        event: 1,
        draw: 'espoir',
        live: true
    }

];

module.exports.getData = () => {
    return tournaments;
}