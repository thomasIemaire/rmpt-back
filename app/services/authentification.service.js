const bcrypt = require("bcrypt");
const RmptUsers = require("../models/RmptUsers.model");

async function getUserByCredentials(username, password) {
    try {
        const user = await RmptUsers.findOne({
            where: {
                username: username
            }
        });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return null;
        else return user;
    } catch (error) {
        throw new Error("Erreur lors de la recherche de l'utilisateur par ses identifiants : " + error.message);
    }
}

async function setUserByCredentials(username, password) {
    try {
        const users = await RmptUsers.findAll({
            attributes: ['uid', 'username']
        });

        if (users.some(user => user.username === username))
            return { message: `Nom d'utilisateur déjà utilisé.` };

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const user = await RmptUsers.create({
            username: username,
            password: hashedPassword,
            fkstatus: 2
        });

        if (!user) return null;
        return user;
    } catch (err) {
        throw new Error(err);
    }
}


module.exports = {
    getUserByCredentials,
    setUserByCredentials,
}