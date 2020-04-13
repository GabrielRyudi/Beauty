var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var config = require("config");

const Helper = {
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    },
    comparePassword(hashPassword, password) {
        console.log(hashPassword);
        return bcrypt.compareSync(password, hashPassword);
    },
    generateToken(id) {
        var secret = config.get('key.key_jwt');
        const token = jwt.sign({idUser: id}, secret, {expiresIn:'7d'});
        return token;
    }
}

module.exports = Helper;