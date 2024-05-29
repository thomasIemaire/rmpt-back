const RmptTournaments = require("../models/RmptTournaments.model");
const RmptUsers = require("../models/RmptUsers.model");
const RmptSeasons = require("../models/RmptSeasons.model");
const RmptPlays = require('../models/RmptPlays.model');

async function getTournaments() {
    try {
        const tournaments = await RmptTournaments.findAll({
            attributes: ['tid', 'name', 'date', 'slots'],
            include: [
                {
                    model: RmptUsers,
                    as: 'host',
                    attributes: ['username']
                },
                {
                    model: RmptSeasons,
                    as: 'season',
                    attributes: ['shortname', 'color']
                }
            ]
        });

        return tournaments;
    } catch (err) {
        throw new Error(err);
    }
}

async function getTournamentById(id) {
    try {
        const tournament = await RmptTournaments.findOne({
            where: {
                tid: id
            },
            attributes: ['tid', 'name', 'date', 'slots', 'description', 'image', 'winner', 'looser', 'board', 'created_at', 'updated_at'],
            include: [
                {
                    model: RmptUsers,
                    as: 'host',
                    attributes: ['username']
                },
                {
                    model: RmptSeasons,
                    as: 'season',
                    attributes: ['shortname', 'color']
                }
            ]
        });

        if (!tournament) return null;
        return tournament;
    } catch (err) {
        throw new Error(err);
    }
}

async function addTournament(name, date, slots, description, seasonId, hostId) {
    try {
        const tournament = await RmptTournaments.create({
            name: name,
            date: date,
            slots: slots,
            description: description,
            fkseason: seasonId,
            fkhost: hostId
        });

        return tournament;
    } catch (err) {
        throw new Error(err);
    }
}

async function modifyTournamentById(id, name, date, slots, description, seasonId, hostId) {
    try {
        let tournament = await RmptTournaments.findByPk(id);

        if (!tournament) {
            throw new Error("Tournoi non trouvé avec l'ID spécifié.");
        }

        tournament.name = name;
        tournament.date = date;
        tournament.slots = slots;
        tournament.description = description;
        tournament.fkseason = seasonId;
        tournament.fkhost = hostId;

        await tournament.save();
        return tournament;
    } catch (err) {
        throw new Error(err);
    }
}

async function deleteTournamentById(id) {
    try {
        const tournament = await RmptTournaments.findByPk(id);

        if (!tournament) {
            throw new Error("Tournoi non trouvé avec l'ID spécifié.");
        }

        await tournament.destroy();
        return tournament;

    } catch (err) {
        throw new Error(err);
    }
}

async function joinTournament(tid, uid) {
    try {
        const play = await RmptPlays.create({
            fktournament: tid,
            fkuser: uid
        });

        return getTournamentPlayers(tid);
    } catch (err) {
        throw new Error(err);
    }
}

async function leaveTournament(tid, uid) {
    try {
        const play = await RmptPlays.findOne({
            where: {
                fktournament: tid,
                fkuser: uid
            }
        });

        if (play) {
            await play.destroy(); 
            return getTournamentPlayers(tid);
        } else
            throw new Error('Le joueur n\'est pas inscrit au tournoi.');
            
    } catch (err) {
        throw new Error(err);
    }
}

async function getTournamentPlayers(tid) {
    try {
        const tournamentPlayers = await RmptPlays.findAll({
            where: {
                fktournament: tid
            },
            include: {
                model: RmptUsers,
                as: 'user',
                attributes: ['uid', 'username']
            }
        });

        return tournamentPlayers.map(player => {
            return {
                uid: player.user.uid,
                username: player.user.username
            };
        });
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    getTournaments,
    getTournamentById,
    addTournament,
    modifyTournamentById,
    deleteTournamentById,
    joinTournament,
    getTournamentPlayers,
    leaveTournament,
}