const fs = require('fs');
const path = require('path');
const RmptUsers = require("../models/RmptUsers.model");

async function getUsers() {
    try {
        const users = await RmptUsers.findAll({
            attributes: [ 'uid', 'username' ]
        });

        if (!users) return null;
        return users;
    } catch (err) {
        throw new Error(err);
    }
}

async function getUserByUsername(username) {
    try {
        const user = await RmptUsers.findOne({
            where: {
                username: username
            },
            attributes: [ 'uid', 'username', 'firstname', 'lastname', 'email', 'phone', 'fkstatus' ]
        });

        if (!user) return null;
        return user;
    } catch (err) {
        throw new Error(err);
    }
}

async function setNewAvatar(username, base64) {
    try {
        const filePath = path.join(__dirname, `../../public/avatars/${username}.png`);
        const imageBuffer = Buffer.from(base64, 'base64');
        fs.writeFileSync(filePath, imageBuffer);
        return filePath;
    } catch (err) {
        throw new Error(`Erreur lors de l'enregistrement de l'image : ${err.message}`);
    }
}

module.exports = {
    getUsers,
    getUserByUsername,
    setNewAvatar
}