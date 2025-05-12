const organizations = [
    {
        id: "ffb",
        name: "Fédération Française de Billard",
        shortName: "FFB - TN",
        url: "https://img.cuescore.com/image/6/2/64c15e92da31b5e500b6abb0d14be0dc.png",
        display: true,
        ranking: true,
        events: [
            {
                id: 1,
                label: "TN1",
                location: "Saint Louis"
            }, {
                id: 2,
                label: "TN2",
                location: "Saint Fulgent"
            }, {
                id: 3,
                label: "TN3",
                location: "Villeneuve-sur-Lot"
            }, {
                id: 4,
                label: "TN4",
                location: "Hazebrouck"
            }, {
                id: 5,
                label: "TN5",
                location: "Châtellerault"
            }, {
                id: 6,
                label: "TN6",
                location: "Boé"
            }
        ],
        draws: [
            {
                id: "bbm",
                label: "BBM",
                ranking: [440, 364, 292, 224, 160, 100]
            }, {
                id: "mixte_a",
                label: "National A"
            }, {
                id: "mixte_b",
                label: "National B"
            }, {
                id: "women",
                label: "Féminin",
                ranking: [164, 132, 104, 80, 60, 44]
            }, {
                id: "veteran",
                label: "Vétérans",
                ranking: [164, 132, 104, 80, 60, 44]
            }, {
                id: "junior",
                label: "Juniors",
                ranking: [164, 132, 104, 80, 60, 44]
            }, {
                id: "espoir",
                label: "Espoirs",
                ranking: [164, 132, 104, 80, 60, 44]
            }, {
                id: "handi",
                label: "Handi",
                ranking: [116, 84, 56, 32]
            }
        ]
    }, {
        id: "lbara",
        name: "Ligue Auvergne-Rhône-Alpes",
        shortName: "LBARA - TR",
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
            }, {
                id: 4,
                label: "TR4",
                location: "Bourg-en-Bresse"
            }, {
                id: 5,
                label: "TR5",
                location: "Aubenas"
            }, {
                id: 6,
                label: "TR6",
                location: "Clarafond"
            }, {
                id: 7,
                label: "TR7",
                location: "Villefranche"
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
        shortName: "LBARA - District",
        url: "https://img.cuescore.com/image/9/2/9542cabd53587b3eeddbb6d2f92bfb17.png",
        display: false,
        ranking: false,
        events: [],
        draws: []
    }, {
        id: "ultimate",
        name: "Ultimate - Qualifier",
        shortName: "Ultimate QLF",
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