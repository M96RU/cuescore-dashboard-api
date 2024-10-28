const tables = [
    {
        organization: 'lbara',
        label: 1,
        id: 12812770,
        code: '68537fab'
    }, {
        organization: 'lbara',
        label: 2,
        id: 12812773,
        code: '8041d95e'
    }, {
        organization: 'lbara',
        label: 3,
        id: 12812776,
        code: 'e241b2b7'
    }, {
        organization: 'lbara',
        label: 4,
        id: 12812779,
        code: '2bf6b7e8'
    }, {
        organization: 'lbara',
        label: 5,
        id: 12812782,
        code: '68a2b136'
    }, {
        organization: 'lbara',
        label: 6,
        id: 12812785,
        code: 'e41be679'
    }, {
        organization: 'lbara',
        label: 7,
        id: 12812797,
        code: 'de108f97'
    }, {
        organization: 'lbara',
        label: 8,
        id: 12812800,
        code: '93c9d835'
    }, {
        organization: 'lbara',
        label: 9,
        id: 12812803,
        code: '48d19094'
    }, {
        organization: 'lbara',
        label: 10,
        id: 12812806,
        code: 'e91a16ed'
    }, {
        organization: 'lbara',
        label: 11,
        id: 12812812,
        code: 'f9df0bac'
    }, {
        organization: 'lbara',
        label: 12,
        id: 12812815,
        code: '53bb9a74'
    }, {
        organization: 'lbara',
        label: 13,
        id: 12812818,
        code: '1e42635d'
    }, {
        organization: 'lbara',
        label: 14,
        id: 12812824,
        code: 'a3c6665d'
    }, {
        organization: 'lbara',
        label: 15,
        id: 12812827,
        code: '68354abc'
    }, {
        organization: 'lbara',
        label: 16,
        id: 12812830,
        code: 'eb66652a'
    }, {
        organization: 'lbara',
        label: 17,
        id: 12812833,
        code: '7f8283bc'
    }, {
        organization: 'lbara',
        label: 18,
        id: 12812839,
        code: 'aab530ea'
    }, {
        organization: 'lbara',
        label: 19,
        id: 12812842,
        code: 'b0d08428'
    }, {
        organization: 'lbara',
        label: 20,
        id: 12812845,
        code: '8891f133'
    }
];

module.exports.getData = () => {
    return tables;
}

module.exports.getByTableId = (tableId) => {
    return tables.find(table => table.id === tableId);
}

