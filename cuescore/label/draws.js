const draws = {

    // Common draws
    'mixte': 'Mixte',
    'women': 'Féminin',
    'veteran': 'Vétérans',
    'handi': 'Handi',

    // FFB draws
    'bbm': 'BBM',
    'espoir': 'Espoirs',
    'junior': 'Juniors',
    'mixte_a': 'National A',
    'mixte_b': 'National B',

    // LBARA draws
    'prestige': 'Prestige',
    'jeune': 'Jeunes',
    'consolante': 'Consolante',
}

module.exports.getData = () => {
    return draws;
}

module.exports.getLabel = (draw) => {
    return draws[draw] ?? draw;
}
