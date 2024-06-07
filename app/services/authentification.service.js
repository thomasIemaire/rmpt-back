const bcrypt = require("bcrypt");
const RmptUsers = require("../models/RmptUsers.model");
const RmptMoreUsers = require("../models/RmptMoreUsers.model");

async function getUserByCredentials(username, password) {
    try {
        let user = await RmptUsers.findOne({
            where: { username },
            include: RmptMoreUsers
        });

        if (!user) return null;
        user = user.get({ plain: true });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return null;
        let moreuser = user.MoreUser;
        moreuser = moreuser ? { firstname: moreuser.firstname, lastname: moreuser.lastname, email: moreuser.email, phone: moreuser.phone } : {};
        user = { uid: user.uid, username: user.username, status: user.status, ...moreuser };
        return user;
    } catch (error) {
        throw new Error("Erreur lors de la recherche de l'utilisateur par ses identifiants : " + error.message);
    }
}

async function setUserByCredentials(username, password, status) {
    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        let user = await RmptUsers.create({
            username: username,
            password: hashedPassword,
            status: status
        });

        if (!user) return null;
        let moreuser = await RmptMoreUsers.create({
            user: user.uid,
            firstname: null,
            lastname: null,
            email: null,
            phone: null
        });
        moreuser = { firstname: moreuser.firstname, lastname: moreuser.lastname, email: moreuser.email, phone: moreuser.phone };
        user = { uid: user.uid, username: user.username, status: user.status, ...moreuser };
        return user;
    } catch (err) {
        throw new Error(err);
    }
}


module.exports = {
    getUserByCredentials,
    setUserByCredentials,
}