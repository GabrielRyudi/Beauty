var express = require('express');
var router = express.Router();
var mongoose = require('../database/mongoose');
var Produto = require('../model/ProdutoModel');
var auth = require('../config/auth');

//Adicionar
router.post('/', auth, (req, res, next) => {
    var {nome, tipo, marca, preco, quantidade} = req.body;
    var newProd = new Produto({nome, tipo, marca, preco, quantidade});
    newProd.save()
        .then(data => {
            res.json({msg:'Produto cadastrado com sucesso'});
        })
        .catch(next);
});

//Listar
router.get('/', auth, (req, res, next) => {
    Produto.find({})
        .then(data => {
            res.json(data);
        })  
        .catch(next);
});

//Pesquisar por nome
router.post('/produtos', auth, (req, res, next) => {
    var {nome} = req.body;
    Produto.find({nome:nome})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Editar Produto
router.put('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    var {nome,tipo, marca, preco, quantidade} = req.body;
    Produto.updateOne({_id:id},{nome:nome,tipo:tipo, marca:marca, preco:preco, quantidade:quantidade})
        .then(data => {
            res.status(200).json({msg:'Produto editado com sucesso'});
        })
        .catch(next);
});

//Deletar Produto
router.delete('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    Produto.deleteOne({_id:id})
        .then(data => {
            res.status(200).json({msg: 'Produto deletado'});
        })
        .catch(next);
});

module.exports = router;