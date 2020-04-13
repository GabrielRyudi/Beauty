var express = require('express');
var router = express.Router();
var mongoose = require('../database/mongoose');
var Transacao = require('../model/TransacoesModel');
var auth = require('../config/auth');

//Adicionar
router.post('/', auth, (req, res, next) => {
    var {tipo, transacao, quantia, data, pessoa} = req.body;
    var newTrans = new Transacao({
        tipo,
        transacao,
        quantia,
        data,
        pessoa
    });
    newTrans.save()
        .then(data => {
            res.json({msg:'Transação feita com sucesso!'});
        })
        .catch(next);
});

//Listar
router.get('/', auth, (req, res, next) => {
    Transacao.find({})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Pesquisar por nome ou tipo
router.post('/transacoes', auth, (req, res, next) => {
    var {pesquisa} = req.body;
    Transacao.find({$or:[{pessoa:pesquisa},{tipo:pesquisa},{data:pesquisa}]})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Editar transação
router.put('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    var {tipo, transacao, quantia, dia, mes, ano, pessoa} = req.body;
    Transacao.updateOne({_id:id},{tipo:tipo, transacao:transacao, quantia:quantia, dia:dia, mes:mes, ano:ano, pessoa:pessoa})
        .then(data => {
            res.stauts(200).json({msg:'Transação editada com sucesso!'});
        })
        .catch(next);
});

//Deletar transação
router.delete('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    Transacao.deleteOne({_id:id})
        .then(data => {
            res.stauts(200).json({msg:'Transação deletada'});
        })
        .catch(next);
});

module.exports = router;