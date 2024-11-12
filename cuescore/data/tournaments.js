const tournaments = [

    // LBARA - TR3
    {
        id: 38986501,
        organization: 'lbara',
        event: 3,
        draw: 'consolante',
        live: true
    },

    // LBARA - TR2
    {
        id: 51040972,
        organization: 'lbara',
        event: 2,
        draw: 'prestige',
        live: false
    }, {
        id: 48186505,
        organization: 'lbara',
        event: 2,
        draw: 'mixte',
        live: false
    }, {
        id: 50901004,
        organization: 'lbara',
        event: 2,
        draw: 'women',
        live: false
    }, {
        id: 50901025,
        organization: 'lbara',
        event: 2,
        draw: 'veteran',
        live: false
    }, {
        id: 50901040,
        organization: 'lbara',
        event: 2,
        draw: 'jeune',
        live: false
    }, {
        id: 51710497,
        organization: 'lbara',
        event: 2,
        draw: 'consolante',
        live: false
    },

    // LBARA - TR1
    {
        id: 48186595,
        organization: 'lbara',
        event: 1,
        draw: 'prestige',
        live: false
    }, {
        id: 48186472,
        organization: 'lbara',
        event: 1,
        draw: 'mixte',
        live: false
    }, {
        id: 48186733,
        organization: 'lbara',
        event: 1,
        draw: 'women',
        live: false
    }, {
        id: 48186760,
        organization: 'lbara',
        event: 1,
        draw: 'veteran',
        live: false
    }, {
        id: 48186781,
        organization: 'lbara',
        event: 1,
        draw: 'jeune',
        live: false
    }, {
        id: 51067966,
        organization: 'lbara',
        event: 1,
        draw: 'consolante',
        live: false
    },

    // FFB - TN1
    {
        id: 45838186,
        organization: 'ffb',
        event: 1,
        draw: 'bbm',
        live: false
    }, {
        id: 45853384,
        organization: 'ffb',
        event: 1,
        draw: 'women',
        live: false
    }, {
        id: 45853969,
        organization: 'ffb',
        event: 1,
        draw: 'junior',
        live: false
    }, {
        id: 45870364,
        organization: 'ffb',
        event: 1,
        draw: 'espoir',
        live: false
    }, {
        id: 45870379,
        organization: 'ffb',
        event: 1,
        draw: 'veteran',
        live: false
    }, {
        id: 49086748,
        organization: 'ffb',
        event: 1,
        draw: 'mixte_a',
        live: false
    }, {
        id: 49369981,
        organization: 'ffb',
        event: 1,
        draw: 'mixte_b',
        live: false
    },

    // FFB - TN2
    {
        id: 49859473,
        organization: 'ffb',
        event: 2,
        draw: 'bbm',
        live: false
    }, {
        id: 49940305,
        organization: 'ffb',
        event: 2,
        draw: 'espoir',
        live: false
    }, {
        id: 49938313,
        organization: 'ffb',
        event: 2,
        draw: 'junior',
        live: false
    }, {
        id: 49940263,
        organization: 'ffb',
        event: 2,
        draw: 'women',
        live: false
    }, {
        id: 49940362,
        organization: 'ffb',
        event: 2,
        draw: 'veteran',
        live: false
    }, {
        id: 50731213,
        organization: 'ffb',
        event: 2,
        draw: 'mixte_a',
        live: false
    }, {
        id: 50736109,
        organization: 'ffb',
        event: 2,
        draw: 'mixte_b',
        live: false
    }, {
        id: 49940395,
        organization: 'ffb',
        event: 2,
        draw: 'handi',
        live: false
    },
];

module.exports.getData = () => {
    return tournaments;
}