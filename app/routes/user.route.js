const express = require('express');
const router = express.Router();
const userService = require('./../services/user.service');
const authentification  = require("../middlewares/authentification");

router.get('/', [authentification.verifyToken], async (req, res, next) => {
    try {
        let users = await userService.getUsers();
        res.json({ users });
    } catch (err) {
        next(err);
    }
});

router.get('/:username', [authentification.verifyToken], async (req, res, next) => {
    try {
        let user = await userService.getUserByUsername(req.params.username);
        res.json({ user });
    } catch (err) {
        next(err);
    }
});

router.post('/:username/avatar', [authentification.verifyToken], async (req, res, next) => {
    try {
        const { uid, base64 } = req.body;
        if (uid === req.uid) {
            let user = await userService.setNewAvatar(req.params.username, base64);
            res.json({ user });
        } else res.json({ message: 'Vous ne pouvez pas modifier la photo de profil d\'un autre utilisateur.' });
    } catch (err) {
        next(err);
    }
});

router.get('/:uid/status', [authentification.verifyToken], async (req, res, next) => {
    try {
        let status = await userService.getStatusByUserId(req.params.uid);
        res.json({ status });
    } catch (err) {
        next(err)
    }
});

module.exports = router;