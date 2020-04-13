var jwt = require("jsonwebtoken");
var config = require('config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        var secret = config.get('key.key_jwt');
        const decoded = jwt.verify(token, secret);
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({message: "Authentification Failed"});
    }
};