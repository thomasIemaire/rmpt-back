const RmptStatusRights = require("../models/RmptStatusRights.model");

async function rightsByStatus(status, right) {
    try {
        let result = await RmptStatusRights.findOne({
            where: {
                status: status,
                right: right
            }
        });
        result = result.get({ plain: true });

        if (!result) return null;
        return result;
    } catch (err) {
        throw new Error(`Erreur : ${err.message}`);
    }
}

module.exports = {
    rightsByStatus,
}