const RmptSeasons = require("../models/RmptSeasons.model");

async function getSeasons() {
    try {
        const seasons = await RmptSeasons.findAll({});

        if (!seasons) return null;
        return seasons;
    } catch (err) {
        throw new Error(err);
    }
}

async function getCurrentSeason() {
    try {
        const season = await RmptSeasons.findOne({
            order: [['sid', 'DESC']]
        });

        if (!season) return null;
        return season;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    getSeasons,
    getCurrentSeason,
}