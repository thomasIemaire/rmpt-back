const jwt = require("jsonwebtoken");
const config = require("../config/authentification.config.js");

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError)
        res.status(401).send({ message: "Unauthorized! Access Token was expired!" });

    res.status(401).send({ message: "Unauthorized!" });
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    
    if (!token)
        token = req.params.token;

    if (!token)
        return res.status(403).send({ message: "No token provided!" });

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err)
            return catchError(err, res);

        req.uid = decoded.uid;
        req.username = decoded.username;
        req.status = decoded.status;

        next();
    });
};

const authJwt = {
    verifyToken: verifyToken
};

module.exports = authJwt;
