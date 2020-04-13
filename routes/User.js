var express = require('express');
var mongoose = require('../database/mongoose');
var User = require('../model/UserModel');
var Helper = require('../config/helper');
var router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        let data = await user.save();
        res.status(201).json({ data });
    } catch (err) {
        res.status(400).json({ err: err });
    }
});

//Login - Token
router.post('/login', async(req, res) => {
    var {email, password} = req.body;
    try{
        var user = await User.findOne({email});
        if(!user) {
            return res.status(400).send({msg: 'Seu email ou senha está errado'});
        }
        if(!Helper.comparePassword(user.password, password)) {
            return res.status(400).send({msg: 'Seu email ou senha está errado'});
        }
        const token = Helper.generateToken(user._id);
        return res.status(200).send({ token });
    }catch(error){
        var erro = error.code;
        res.json({msg: erro});
    }
});

module.exports = router;