const proxy = require('./services/proxy');
const results = require('./services/results');
const tournamentService = require('./services/tournament');
const moment = require("moment-timezone");

const WALK_OVER_PLAYER_ID = 1000615;

const baseUrl = '/api/cuescore'

const matchIsLive = (match) => {
    return match && match.status === 'playing' && match.tableId;
}

const matchIsPlanned = (match) => {
    return match && match.tableId && match.status !== 'finished' && match.status !== 'playing';
}

const matchJustFinished = (match) => {
    if (!match || match.status !== 'finished' || !match.stoptime) {
        return false;
    }
    return moment().diff(match.stoptime) < 300000; // 5 minutes x 60 seconds x 1000 ms
}

const labelDraws = require('./label/draws');
const Rank = require("./model/rank");

const organizations = require('./data/organizations').getData();
const tables = require('./data/tables').getData();
const tournaments = require('./data/tournaments').getData();

const init = (app) => {

    app.get(baseUrl + '/organizations', async (req, res) => {
        res.send({
            organizations: organizations
        });
    });

    app.get(baseUrl + '/organizations/:id', (req, res) => {
        res.send(organizations.find(organization => organization.id === req.params.id) ?? "{}");
    });

    app.get(baseUrl + '/organizations/:id/events/:eventId', (req, res) => {
        res.send(tournaments
            .filter(tournament => tournament.organization === req.params.id && tournament.event === +req.params.eventId)
        );
    });

    app.get(baseUrl + '/organizations/:id/rankings/:draw', async (req, res) => {

        const organization = organizations.find(organization => organization.id === req.params.id);
        if (!organization || !organization.ranking) {
            return res.send({});
        }

        const draw = organization.draws.find(draw => draw.id === req.params.draw);
        if (!draw || !draw.ranking || !draw.ranking.length) {
            return res.send({});
        }

        const drawTournaments = tournaments.filter(tournament => tournament.organization === organization.id && tournament.draw === draw.id);

        const ranking = {};

        for (let tournament of drawTournaments) {
            const data = tournament.live ? await proxy.getTournament(tournament) : results.getTournament(tournament);

            const tournamentRanking = tournamentService.getRanking(Object.values(data.matches), draw.ranking);

            for (let eventRank of Object.values(tournamentRanking)) {
                eventRank.event = tournament.event;
                const seasonRanking = ranking[eventRank.playerId] ?? new Rank();
                seasonRanking.playerId = eventRank.playerId;
                if (seasonRanking.points === undefined) {
                    seasonRanking.points = 0; // init
                }
                seasonRanking.points += eventRank.points;
                seasonRanking.won += eventRank.won;
                seasonRanking.lost += eventRank.lost;
                seasonRanking.gameAverage += eventRank.gameAverage;
                seasonRanking.events.push(eventRank);

                if (data.players[seasonRanking.playerId]) {
                    seasonRanking['player'] = data.players[seasonRanking.playerId];
                }

                ranking[eventRank.playerId] = seasonRanking;
            }
        }

        const rankings = Object.values(ranking).sort((p1, p2) => {
            if (p2.points === p1.points) {
                if (p2.gameAverage === p1.gameAverage) {
                    return p2.won - p1.won;
                }
                return p2.gameAverage - p1.gameAverage;
            }
            return p2.points - p1.points;
        });

        res.send({
            organization: organization,
            draw: draw,
            rankings: rankings
        });
    });

    app.get(baseUrl + '/tournaments/:id', async (req, res) => {
        const tournamentId = +req.params.id;

        const response = {
            tournament: tournaments.find(t => t.id === tournamentId),
            matches: [],
            players: undefined
        }

        if (response.tournament) {

            const data = response.tournament.live ? await proxy.getTournament(response.tournament) : results.getTournament(response.tournament);

            for (let match of Object.values(data.matches).filter(match => match.playerAid !== WALK_OVER_PLAYER_ID && match.playerBid !== WALK_OVER_PLAYER_ID)) {

                if (match.playerAid > 0) {
                    match['playerA'] = data.players[match.playerAid];
                    delete match.playerAid;
                }
                if (match.playerBid > 0) {
                    match['playerB'] = data.players[match.playerBid];
                    delete match.playerBid;
                }
                response.matches.push(match);
            }

            response.players = Object.values(data.players).filter(player => player.id !== WALK_OVER_PLAYER_ID);
        }
        res.send(response);
    });

    app.get(baseUrl + '/tables/:id', async (req, res) => {
        const table = tables.find(t => t.id === +req.params.id) ?? undefined;

        if (!table) {
            // table not found
            return res.send({});
        }

        const response = {
            table: table,
            match: null
        }

        const data = await proxy.getData();
        const matches = Object.values(data.matches).filter(match => table.id === match.tableId);

        for (const filterMethod of [matchIsLive, matchIsPlanned, matchJustFinished]) {
            const filtered = matches.filter(filterMethod);
            if (filtered && filtered.length > 0) {
                response.match = filtered[0];
                // match found, retrieve response
                return res.send(response);
            }
        }

        // no match in progress
        return res.send(response);
    });

    app.get(baseUrl + '/scanner/:code', async (req, res) => {
        const table = tables.find(t => t.code === req.params.code.toLowerCase()) ?? {};
        return res.send(table);
    });

    app.get(baseUrl + '/live', async (req, res) => {

        // keep last match per table
        const liveMatches = {};
        const upcomingMatches = {};
        const finishedMatches = {};

        const live = {
            organisations: organizations,
            matches: []
        }
        const data = await proxy.getData();

        for (let match of Object.values(data.matches).filter(m => !req.query.organization || req.query.organization === m.organization)) {

            if (match.playerAid) {
                match['playerA'] = data.players[match.playerAid];
                delete match.playerAid;
            }
            if (match.playerBid) {
                match['playerB'] = data.players[match.playerBid];
                delete match.playerBid;
            }

            if (match['playerA'] && match['playerB']) {
                if (matchIsLive(match)) {
                    liveMatches[match.tableId] = match;

                } else if (matchIsPlanned(match)) {
                    upcomingMatches[match.tableId] = match;
                } else if (matchJustFinished(match)) {
                    if (match.tableId) {
                        finishedMatches[match.tableId] = match;
                    }
                }
            }

        }

        for (let match of Object.values(upcomingMatches).filter(m => !liveMatches[m.tableId])) {
            liveMatches[match.tableId] = match;
        }
        for (let match of Object.values(finishedMatches).filter(m => !liveMatches[m.tableId])) {
            liveMatches[match.tableId] = match;
        }

        live.matches = Object.values(liveMatches);
        res.send(live);
    });

    app.get(baseUrl + '/matches', async (req, res) => {
        const resultsData = results.getData();
        const matches = resultsData.matches;
        const data = await proxy.getData();

        for (let match of Object.values(data.matches)) {
            matches[match.id] = match;
        }

        res.send(Object.values(matches));
    });

    app.get(baseUrl + '/players', async (req, res) => {
        const resultsData = results.getData();
        const players = resultsData.players;
        const data = await proxy.getData();

        for (let player of Object.values(data.players)) {
            players[player.id] = player;
        }

        res.send(Object.values(players));
    });
}

module.exports.init = init;
