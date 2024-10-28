module.exports.getFolder = (tournament) => {
    return __dirname + '/../backup/' + tournament.organization + '/' + tournament.event;
};
