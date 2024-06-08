const express = require('express');
const router = express.Router();
const authentification  = require("../middlewares/authentification");
const commonService = require("../services/common.service");
const seasonService = require("../services/season.service");

router.post('/', [authentification.verifyToken], async (req, res, next) => {
    try {
        let rightsByStatus = await commonService.rightsByStatus(req.status, 1);
        if (rightsByStatus["create"] === 1) {
            const { longname, shortname, color } = req.body;
            const startdate = new Date();
            const enddate = null;

            const season = await seasonService.setNewSeason(longname, shortname, color, startdate, enddate);

            if (!season) res.json({ message: 'La saison n\'a pas été créé.' });
            else res.json(season);
        } else res.json({ message: 'Vous n\'avez pas les droits pour créer des saisons!' });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', [authentification.verifyToken], async (req, res, next) => {
    try {
        let rightsByStatus = await commonService.rightsByStatus(req.status, 1);
        if (rightsByStatus["delete"] === 1) {
            const id = req.params.id;

            const season = await seasonService.deleteSeason(id);

            if (!season) res.json({ message: 'La saison n\'a pas été supprimé.' });
            else res.json(season);
        } else res.json({ message: 'Vous n\'avez pas les droits pour supprimer des saisons!' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;