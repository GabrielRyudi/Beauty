var express = require('express');
var router = express.Router();
var mongoose = require('../database/mongoose');
var cliente = require('../model/ClienteModel');
var fornecedor = require('../model/FornecedoresModel');
var funcionario = require( '../model/FuncionarioModel');
var transacao = require('../model/TransacoesModel');
var auth = require('../config/auth');

//Pesquisar
router.post('/', auth, (req, res, next) => {
    var {pesquisa} = req.body;
    cliente.findOne({nome:pesquisa})
        .then(data => {
            if(!data){
                fornecedor.findOne({nome:pesquisa})
                    .then(dt => {
                        if(!dt){
                            funcionario.findOne({nome:pesquisa})
                                .then(dtt => {
                                    if(!dtt){
                                        res.json({msg:'Nenhum registro encontrado!'});
                                    }else{
                                        transacao.find({pessoa:nome})
                                            .then(td => {
                                                res.json({info:dtt, hist:td});
                                            })
                                            .catch(next)
                                    }
                                })
                                .catch(next)
                        }else{
                            var marca = dt.marca;
                            transacao.find({pessoa:marca})
                                .then(td => {
                                    res.json({info:dt, hist:td});
                                })
                                .catch(next)
                        }
                    })
                    .catch(next)
            }else{
                var nome = data.nome;
                transacao.find({pessoa:nome})
                    .then(td => {
                        res.json({info:data, hist:td});
                    })
                    .catch(next)
            }
        })
        .catch(next)
});

module.exports = router;