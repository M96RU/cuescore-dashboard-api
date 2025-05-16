const moment = require('moment-timezone');

module.exports = class Match {

    // Labels
    organization;
    draw;
    duration;
    pauseSeconds;
    scorerUrl;

    // Match
    id; // pk
    tournamentId; // pk of tournament
    status;
    round;
    order;
    roundName;
    starttime;
    stoptime;

    // Players
    playerAid; // pk of player
    playerBid; // pk of player

    // Score
    scoreA;
    scoreB;
    raceTo;

    // Players status
    statusA;
    statusB;

    // Players label (Winner of match 7)
    labelA;
    labelB;

    // Pause (temporary)
    pauseAstart;
    pauseAstop;
    pauseBstart;
    pauseBstop;

    // Table
    tableId;
    tableName;

    constructor(cuescore, timezone) {
        this.id = cuescore['matchId'];
        this.tournamentId = cuescore.tournamentId;
        this.status = cuescore['matchstatus'];
        this.round = cuescore.round;
        this.order = cuescore['matchno'];
        if (cuescore.playerA) {
            if (cuescore.playerA['playerId']) {
                this.playerAid = cuescore.playerA['playerId'];
            } else if (cuescore.playerA['name']) {
                this.labelA = cuescore.playerA['name'].replace("Vainqueur du match ", "V");
            }
        }
        if (cuescore.playerB) {
            if (cuescore.playerB['playerId']) {
                this.playerBid = cuescore.playerB['playerId'];
            } else if (cuescore.playerB['name']) {
                this.labelB = cuescore.playerB['name'].replace("Vainqueur du match ", "V");
            }
        }
        switch (cuescore['penalty']) {
            case 1: // Forfeit
            case 4: // Disqualified
            case 16: // Abandoned
                this.statusA = 'DIS';
                break;
            case 2: // Forfeit
            case 8: // Disqualified
            case 32: // Disqualified
                this.statusB = 'DIS';
                break;
        }
        this.scoreA = cuescore.scoreA;
        this.scoreB = cuescore.scoreB;
        this.raceTo = cuescore.raceTo;
        this.roundName = cuescore.roundName;

        /*
        if (cuescore.starttime) {
            if (timezone) {
                this.starttimeBak = moment.tz(cuescore.starttime, timezone).utc();
            } else {
                this.starttimeBak = moment(cuescore.starttime);
            }
        }
         */

        if (cuescore.notes) {
            for (let cuescoreNote of cuescore.notes) {
                if (cuescoreNote.time) {
                    const time = timezone ? moment.tz(cuescoreNote.time, timezone).utc() : moment(cuescoreNote.time);
                    if (cuescoreNote.note === 'frame start' || cuescoreNote.note === 'A breaking' || cuescoreNote.note === 'B breaking') {
                        if (!this.starttime) {
                            this.starttime = time;
                        }
                    } else if (cuescoreNote.note === 'A timeout start') {
                        this.pauseAstart = time;
                    } else if (cuescoreNote.note === 'A timeout end') {
                        this.pauseAstop = time;
                    } else if (cuescoreNote.note === 'B timeout start') {
                        this.pauseBstart = time;
                    } else if (cuescoreNote.note === 'B timeout end') {
                        this.pauseBstop = time;
                    }
                }
            }
        }

        this.pauseSeconds = this.computePauseSeconds();
        if (this.starttime && this.pauseSeconds > 0) {
            const duration = moment.duration(this.pauseSeconds, 's');
            this.starttime.add(duration);
        }

        if (cuescore.stoptime) {
            if (timezone) {
                this.stoptime = moment.tz(cuescore.stoptime, timezone).utc();
            } else {
                this.stoptime = moment(cuescore.stoptime);
            }
        }
        if (cuescore.table) {
            this.tableId = cuescore.table.tableId;
            this.tableName = cuescore.table.name;
        }
    }

    computePauseSeconds() {
        if (!this.starttime) {
            return 0;
        }
        const pauseAstop = this.pauseAstop ? this.pauseAstop : moment();
        const pauseAstopTimestamp = pauseAstop.unix();
        const pauseBstop = this.pauseBstop ? this.pauseBstop : moment();
        const pauseBstopTimestamp = pauseBstop.unix();

        if (this.pauseAstart && this.pauseBstart) {
            const pauseAstartTimestamp = this.pauseAstart.unix();
            const pauseBstartTimestamp = this.pauseBstart.unix();

            if (pauseAstartTimestamp > pauseBstopTimestamp || pauseBstartTimestamp > pauseAstopTimestamp) {
                // do nothing here, will be calculated later
            } else {
                const pauseStartTimestamp = Math.min(pauseAstartTimestamp, pauseBstartTimestamp);
                const pauseStopTimestamp = Math.max(pauseAstopTimestamp, pauseBstopTimestamp);
                return pauseStopTimestamp - pauseStartTimestamp;
            }
        }

        let pauseSecondsDuration = 0;

        if (this.pauseAstart) {
            pauseSecondsDuration += pauseAstopTimestamp - this.pauseAstart.unix();
        }

        if (this.pauseBstart) {
            pauseSecondsDuration += pauseBstopTimestamp - this.pauseBstart.unix();
        }

        return pauseSecondsDuration;
    }
}