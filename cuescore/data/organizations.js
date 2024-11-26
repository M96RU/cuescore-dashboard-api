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
            }, {
                id: 3,
                label: "TR3",
                location: "Feurs"
            }
        ],
        draws: [
            {
                id: "prestige",
                label: "Prestige",
                ranking: [440, 364, 292, 224, 160, 100]
            }, {
                id: "mixte",
                label: "Mixte",
                ranking: [220, 182, 146, 112, 80, 50, 25, 10, 5]
            }, {
                id: "women",
                label: "Féminin",
                ranking: [220, 182, 146, 112, 80, 50, 25, 10, 5]
            }, {
                id: "veteran",
                label: "Vétérans",
                ranking: [220, 182, 146, 112, 80, 50, 25, 10, 5]
            }, {
                id: "jeune",
                label: "Jeunes",
                ranking: [220, 182, 146, 112, 80, 50, 25, 10, 5]
            }, {
                id: "consolante",
                label: "Consolante",
                ranking: undefined
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