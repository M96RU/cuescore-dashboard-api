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
                location: "Meze"
            },
            {
                id: 2,
                label: "TN2",
                location: "Corbeil Essones"
            },
            {
                id: 3,
                label: "TN3",
                location: "Saint-Pair sur Mer"
            }
        ],
        draws: [
            {
                id: "bbm",
                label: "BBM",
                ranking: [440, 364, 292, 224, 160, 100]
            }, {
                id: "national",
                label: "National",
                ranking: [220, 190, 162, 136, 112, 90, 70, 52, 36, 22, 10]
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
                location: "Bourg-en-Bresse"
            },
            {
                id: 2,
                label: "TR2",
                location: "Bourg-de-Péage"
            },
            {
                id: 3,
                label: "TR3",
                location: "Feurs"
            },
            {
                id: 4,
                label: "TR4",
                location: "Sévrier"
            },
            {
                id: 5,
                label: "TR5",
                location: "Feurs"
            }
        ],
        draws: [
            {
                id: "prestige",
                label: "Prestige",
                ranking: [660, 546, 438, 336, 240, 150]
            }, {
                id: "excellence",
                label: "Excellence",
                ranking: [330, 273, 219, 168, 120, 75, 34, 27]
            }, {
                id: "promotion",
                label: "Promotion",
                ranking: [165, 137, 110, 84, 60, 38, 17]
            }, {
                id: "women",
                label: "Féminin",
                ranking: [165, 137, 110, 84, 60, 38, 17]
            }, {
                id: "veteran",
                label: "Vétérans",
                ranking: [165, 137, 110, 84, 60, 38, 17]
            }, {
                id: "jeune",
                label: "Jeunes",
                ranking: [165, 137, 110, 84, 60, 38, 17]
            }, {
                id: "jeune_b",
                label: "Jeunes B"
            }, {
                id: "prestige_bonus",
                label: "Prestige Bonus"
            }, {
                id: "excellence_bonus",
                label: "Excellence Bonus",
            }, {
                id: "promotion_bonus",
                label: "Promotion Bonus",
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