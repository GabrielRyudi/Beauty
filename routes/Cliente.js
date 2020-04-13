var express = require('express');
var router = express.Router();
var mongoose = require('../database/mongoose');
var Cliente = require('../model/ClienteModel');
var auth = require('../config/auth');

//Adicionar cliente
router.post('/', auth, (req, res, next) => {
    var {nome, celular, rua, bairro, cidade, numero, datanasc, obs} = req.body;
    let newCli = new Cliente({
        nome,
        celular,
        rua,
        bairro,
        cidade,
        numero,
        datanasc,
        obs
    });
    newCli.save()
        .then(data => {
            res.json({msg:'Cliente cadastrado com sucesso!', logado: req.user});
        })
        .catch(next);
});

//Listar Clientes
router.get('/', auth, (req, res, next) => {
    Cliente.find({})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Procurar por nome ou telefone 
router.post('/clientes', auth, (req, res, next) => {
    var {pesquisa} = req.body;
    Cliente.find({$or:[{celular:pesquisa}, {nome:pesquisa}, {cidade:pesquisa}]})
            .then(data => {
                res.json({data:data})
            })
            .catch(next);
});

//Editar cliente
router.put('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    let {nome, celular, rua, bairro, cidade, numero, datanasc, obs} = req.body;
    Cliente.updateOne({_id:id},{nome: nome, celular:celular, rua:rua, bairro:bairro, cidade:cidade, numero:numero, 
    datanasc:datanasc, obs:obs})
        .then(data => {
            res.json({msg: 'Cliente editado com sucesso!'});
        })
        .catch(next);
});

//Deletar cliente
router.delete('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    Cliente.deleteOne({_id:id})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});

module.exports = router;