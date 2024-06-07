const express = require('express');
const router = express.Router();
const config = require("../config/authentification.config");
const authentification  = require("../middlewares/authentification");
const { generateIdenticon } = require("../middlewares/avatar");
const authentificationService = require('../services/authentification.service');
var jwt = require("jsonwebtoken");

router.get('/', [authentification.verifyToken], async (req, res, next) => {
    try {
        let accessToken = jwt.sign({
            uid: req.uid,
            username: req.username,
            status: req.status,
        }, config.secret, { expiresIn: config.jwtExpiration });

        res.status(200).send({ token: accessToken, user: { uid: req.uid, username: req.username }});
    } catch(err) {
        next(err);
    }
});

router.post('/signin', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        let user = await authentificationService.getUserByCredentials(username, password);

        if (!user)
            res.status(404).send({ message : "Nom d'utilisateur ou mot de passe invalide"});
        else {
            let accessToken = jwt.sign({
                uid: user.uid,
                username: user.username,
                status: user.status,
            }, config.secret, { expiresIn: config.jwtExpiration });

            res.status(200).send({ token: accessToken, user });
        }   
    } catch (err) {
        next(err)
    }
});

router.post('/signup', async (req, res, next) => {
    try {
        const { username, password } = req.body; // ajouter status
        let user = await authentificationService.setUserByCredentials(username, password, 3); // remplacer 3 par status

        if(user.message) res.status(404).send({ message: user.message });
        else {
            let accessToken = jwt.sign({
                uid: user.uid,
                username: user.username,
                status: user.status,
            }, config.secret, { expiresIn: config.jwtExpiration });

            generateIdenticon(username);
            res.status(200).send({ token: accessToken, user });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;