const express = require('express');
const router = express.Router();
const tournamentsService = require('./../services/tournament.service');
const authentification  = require("../middlewares/authentification");

router.get('/', [authentification.verifyToken], async (req, res, next) => {
    try {
        let tournaments = await tournamentsService.getTournaments();
        res.json({ tournaments });
    } catch (err) {
        next(err);
    }
});

router.post('/', [authentification.verifyToken], async (req, res, next) => {
    try {
        const { name, date, slots, description, seasonId, hostId } = req.body;
        let tournament = await tournamentsService.addTournament(name, date, slots, description, seasonId, hostId);
        res.json({ tournament });
    } catch (err) {
        next(err);
    }
});

router.get('/:id', [authentification.verifyToken], async (req, res, next) => {
    try {
        const tid = req.params.id;
        let tournament = await tournamentsService.getTournamentById(tid);
        res.json({ tournament });
    } catch (err) {
        next(err);
    }
});

router.post('/:id', [authentification.verifyToken], async (req, res, next) => {
    try {
        const tid = req.params.id;
        const { name, date, slots, description, seasonId, hostId } = req.body;
        let tournament = await tournamentsService.modifyTournamentById(tid, name, date, slots, description, seasonId, hostId);
        res.json({ tournament });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', [authentification.verifyToken], async (req, res, next) => {
    try {
        const tid = req.params.id;
        let tournament = await tournamentsService.deleteTournamentById(tid);
        res.json({ tournament });
    } catch (err) {
        next(err);
    }
});

router.get('/:id/players', [authentification.verifyToken], async (req, res, next) => {
    try {
        const tid = req.params.id;
        let players = await tournamentsService.getTournamentPlayers(tid);
        res.json({ players });
    } catch (err) {
        next(err);
    }
});

router.post('/:id/join', [authentification.verifyToken], async (req, res, next) => {
    try {
        const tid = req.params.id;
        const { uid } = req.body;
        let players = await tournamentsService.joinTournament(tid, uid);
        res.json({ players });
    } catch (err) {
        next(err);
    }
});

router.post('/:id/leave', [authentification.verifyToken], async (req, res, next) => {
    try {
        const tid = req.params.id;
        const { uid } = req.body;
        let players = await tournamentsService.leaveTournament(tid, uid);
        res.json({ players });
    } catch (err) {
        next(err);
    }
});

module.exports = router;