var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Fornecedor = require('../model/FornecedoresModel');
var auth = require('../config/auth');

//Adicionar
router.post('/', auth, (req, res, next) => {
    var {nome, celular, marca, obs} = req.body;
    var newFor = new Fornecedor({nome, celular, marca, obs});
    newFor.save()
        .then(data => {
            res.json({msg:'Fornecedor cadastrado com sucesso!'});
        })
        .catch(next);
});

//Listar
router.get('/', auth, (req, res, next) => {
    Fornecedor.find({})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Pesquisar vendedor por nome ou marca
router.post('/fornecedores', auth, (req, res, next) => {
    var {pesquisa} = req.body;
    Fornecedor.find({$or:[{nome:pesquisa},{marca:pesquisa}]})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Editar fornecedor
router.put('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    var {nome, celular, marca, obs} = req.body;
    Fornecedor.updateOne({_id:id}, {nome:nome, celular:celular, marca:marca, obs:obs})
        .then(data => {
            res.status(200).json({msg:'Fornecedor alterado com sucesso!'});
        })
        .catch(next);
});

//Deletar fornecedor
router.delete('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    Fornecedor.deleteOne({_id:id})
        .then(data => {
            res.status(200).json({mag:'Fornecedor deletado com sucesso!'});
        })
        .catch(next);
});

module.exports = router;
