const organizations = [
    {
        id: "ffb",
        name: "Fédération Française de Billard",
        url: "https://img.cuescore.com/image/6/2/64c15e92da31b5e500b6abb0d14be0dc.png",
        display: true,
        ranking: false,
        events: [
            {
                id: 1,
                label: "TN1",
                location: "Saint Louis"
            }, {
                id: 2,
                label: "TN2",
                location: "Saint Fulgent"
            }
        ],
        draws: [
            {
                id: "bbm",
                label: "BBM"
            }, {
                id: "mixte_a",
                label: "National A"
            }, {
                id: "mixte_b",
                label: "National B"
            }, {
                id: "women",
                label: "Féminin"
            }, {
                id: "veteran",
                label: "Vétérans"
            }, {
                id: "junior",
                label: "Juniors"
            }, {
                id: "espoir",
                label: "Espoirs"
            }, {
                id: "handi",
                label: "Handi"
            }
        ]
    }, {
        id: "lbara",
        name: "Ligue Auvergne-Rhône-Alpes",
        url: "https://img.cuescore.com/image/9/2/9542cabd53587b3eeddbb6d2f92bfb17.png",
        display: true,
        ranking: true,
        events: [
            {
                id: 1,
                label: "TR1",
                location: "Evian"
            }, {
                id: 2,
                label: "TR2",
                location: "Bourg les Valence"
            }
        ],
        draws: [
            {
                id: "prestige",
                label: "Prestige"
            }, {
                id: "mixte",
                label: "Mixte"
            }, {
                id: "women",
                label: "Féminin"
            }, {
                id: "veteran",
                label: "Vétérans"
            }, {
                id: "jeune",
                label: "Jeunes"
            }
        ]
    }, {
        id: "lbara_district",
        name: "LBARA - District Lyonnais",
        url: "https://img.cuescore.com/image/9/2/9542cabd53587b3eeddbb6d2f92bfb17.png",
        display: false,
        ranking: false,
        events: [],
        draws: []
    }
];

module.exports.getData = () => {
    return organizations;
}