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
        live: false
    }, {
        id: 62937217,
        organization: 'lbara',
        event: 1,
        draw: 'excellence',
        live: false
    }, {
        id: 62942887,
        organization: 'lbara',
        event: 1,
        draw: 'promotion',
        live: false
    }, {
        id: 63111664,
        organization: 'lbara',
        event: 1,
        draw: 'women',
        live: false
    }, {
        id: 63110329,
        organization: 'lbara',
        event: 1,
        draw: 'veteran',
        live: false
    }, {
        id: 63111988,
        organization: 'lbara',
        event: 1,
        draw: 'jeune',
        live: false
    }, {
        id: 64420330,
        organization: 'lbara',
        event: 1,
        draw: 'jeune_b',
        live: false
    }, {
        id: 62607499,
        organization: 'lbara',
        event: 1,
        draw: 'prestige_bonus',
        live: false
    }, {
        id: 62942419,
        organization: 'lbara',
        event: 1,
        draw: 'excellence_bonus',
        live: false
    }, {
        id: 62942905,
        organization: 'lbara',
        event: 1,
        draw: 'promotion_bonus',
        live: false
    },



    // FFB - TN1
    {
        id: 65725993,
        organization: 'ffb',
        event: 1,
        draw: 'bbm',
        live: false
    }, {
        id: 65725951,
        organization: 'ffb',
        event: 1,
        draw: 'national',
        live: false
    }, {
        id: 65725861,
        organization: 'ffb',
        event: 1,
        draw: 'women',
        live: false
    }, {
        id: 65725936,
        organization: 'ffb',
        event: 1,
        draw: 'veteran',
        live: false
    }, {
        id: 65722312,
        organization: 'ffb',
        event: 1,
        draw: 'junior',
        live: false
    }, {
        id: 65725849,
        organization: 'ffb',
        event: 1,
        draw: 'espoir',
        live: false
    }

];

module.exports.getData = () => {
    return tournaments;
}