var express = require('express');
var router = express.Router();
var mongoose = require('../database/mongoose');
var Funcionario = require('../model/FuncionarioModel');
var auth = require('../config/auth');

//Adicionar
router.post('/', auth, (req, res, next) => {
    var {nome, celular, obs} = req.body;
    var newFun = new Funcionario({nome, celular, obs});
    newFun.save()
        .then(data => {
            res.json({msg:'Funcionario cadastrado com sucesso!'});
        })
        .catch(next);
});

//Listar
router.get('/', auth, (req, res, next) => {
    Funcionario.find({})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Pesquisar por nome
router.post('/funcionarios', auth, (req, res, next) => {
    var {nome} = req.body;
    Funcionario.find({nome:nome})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Editar funcionario
router.put('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    var {nome, celular, obs} = req.body;
    Funcionario.updateOne({_id:id}, {nome:nome, celular:celular, obs:obs})
        .then(data => {
            res.status(200).json({msg:'Funcionario editado com sucesso!'});
        })
        .catch(next);
});

//Deletar compra
router.delete('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    Funcionario.deleteOne({_id:id})
        .then(data => {
            res.status(200).json({msg:'Funcionario deletado com sucesso'});
        })
        .catch(next);
});

module.exports = router;
