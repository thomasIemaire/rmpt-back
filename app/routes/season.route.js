const express = require('express');
const router = express.Router();
const seasonService = require('./../services/season.service');

router.get('/', async (req, res, next) => {
    try {
        let seasons = await seasonService.getSeasons();
        res.json({ seasons });
    } catch (err) {
        next(err);
    }
});

router.get('/current', async (req, res, next) => {
    try {
        let season = await seasonService.getCurrentSeason();
        res.json({ season });
    } catch (err) {
        next(err);
    }
});

module.exports = router;