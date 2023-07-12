const { verifyToken } = require("../helpers/jwt");

const authorizationToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(403).send("Invalid authorization");
    }
    const token = authorization.split(" ")[1];
    try {
        const data = verifyToken(token);
        req.userEmail = data.user.email;
        return next();
    } catch {
        return res.sendStatus(403);
    }
}

module.exports = { authorizationToken };