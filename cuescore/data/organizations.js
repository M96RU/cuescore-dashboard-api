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
            }
        ],
        draws: [
            {
                id: "bbm",
                label: "BBM",
                ranking: [440, 364, 292, 224, 160, 100]
            }, {
                id: "national",
                label: "National"
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
            }
        ],
        draws: [
            {
                id: "prestige",
                label: "Prestige",
                ranking: [440, 364, 292, 224, 160, 100]
            }, {
                id: "excellence",
                label: "Excellence",
                ranking: [220, 182, 146, 112, 80, 50, 25, 10, 5]
            }, {
                id: "promotion",
                label: "Promotion",
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
                id: "jeune_b",
                label: "Jeunes B",
                ranking: [220, 182, 146, 112, 80, 50, 25, 10, 5]
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