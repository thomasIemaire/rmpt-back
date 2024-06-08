const RmptSeasons = require('../models/RmptSeasons.model');

async function setNewSeason(longname, shortname, color, startdate, enddate) {
    try {
        const newSeason = await RmptSeasons.create({
            longname,
            shortname,
            color,
            startdate,
            enddate
        });

        if (!newSeason) return null;
        return newSeason;
    } catch (err) {
        throw new Error(err);
    }
}

async function deleteSeason(id) {
    try {
        const season = await RmptSeasons.findByPk(id);

        if (!season) return null;
        else await season.destroy();
        return { message: `La saison ${id} a bien été supprimé.` };
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    setNewSeason,
    deleteSeason,
}