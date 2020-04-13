var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var config = require("config");

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Include your name"]
    },
    email: {
        type: String,
        required: [true, "Please Include your email"]
    },
    password: {
        type: String,
        required: [true, "Please Include your password"]
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre("save", async function(next) {
    var user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function() {
    var user = this;
    var secret = config.get('key.key_jwt');
    var token = jwt.sign({ _id: user._id, name: user.name, email: user.email },secret, {expiresIn: '1d'});
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    var user = await User.findOne({ email });
    if (!user) {
        throw new Error({ error: "Invalid login details" });
    }
    var isPasswordMatch = await bcrypt.compare(password, user.senha);
    if (!isPasswordMatch) {
        throw new Error({ error: "Invalid login details" });
    }
    return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;