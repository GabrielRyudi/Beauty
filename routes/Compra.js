var express = require('express');
var router = express.Router();
var mongoose = require('../database/mongoose');
var Compra = require('../model/CompraModel');
var Produto = require('../model/ProdutoModel');
var Transacao = require('../model/TransacoesModel');
var auth = require('../config/auth');

//Adicionar
router.post('/', auth, (req, res, next) => {
    var {produto, fornecedor, marca, data, preco, quantidade, pago} = req.body;
    var precototal = parseInt(quantidade)*parseInt(preco);
    let newBuy = new Compra({
        produto,
        fornecedor,
        marca,
        data,
        preco,
        quantidade,
        precototal,
        pago
    });
    newBuy.save()
        .then(cdt => {
            Produto.findOne({nome:produto})
                .then(dt => {
                    if(!dt){
                        var nome = produto;
                        var newProd = new Produto({nome, marca, preco, quantidade});
                        newProd.save()
                            .then(dtt => {
                                var tipo = 'Saida';
                                var transacao = 'Produto';
                                var pessoa = marca;
                                var quantia = precototal;
                                var newTrans = new Transacao({
                                    tipo,
                                    transacao,
                                    quantia,
                                    data,
                                    pessoa
                                });
                                newTrans.save()
                                    .then(datac => {
                                        res.status(200).json({msg:'Compra do produto bem sucedida!'});
                                    })
                                    .catch(next);
                            })
                            .catch(next);
                    }else{
                        var id = dt._id;
                        var qtd = parseInt(dt.quantidade) + parseInt(quantidade);
                        Produto.updateOne({_id:id},{quantidade:qtd})
                            .then(upto => {
                                var tipo = 'Saida';
                                var transacao = 'Produto';
                                var pessoa = marca;
                                var quantia = precototal;
                                var newTrans = new Transacao({
                                    tipo,
                                    transacao,
                                    quantia,
                                    data,
                                    pessoa
                                });
                                newTrans.save()
                                    .then(datac => {
                                        res.status(200).json({msg:'Compra do produto bem sucedida!'});
                                    })
                                    .catch(next);
                            })
                            .catch(next);
                    }
                })
                .catch(next);
        })
        .catch(next);
});

//Listar
router.get('/', auth, (req, res, next) => {
    Compra.find({})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Pesquisar compras realizadas de produto
router.post('/compras', auth, (req, res, next) => {
    var {pesquisa} = req.body;
    Compra.find({$or:[{produto:pesquisa},{marca:pesquisa},{data:pesquisa}]})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Editar compra
router.put('/:id', auth, (req, res, next) => {
    var {produto, fornecedor, marca, dia, mes, ano, preco, quantidade} = req.body;
    Compra.updateOne({_id:id},{produto:produto, fornecedor:fornecedor, marca:marca, dia:dia, mes:mes, ano:ano, preco:preco, quantidade:quantidade})
        .then(data => {
            res.satus(200).json({msg:'compra editada com sucesso!'});
        })
        .catch(next);
});

//Deletar compra
router.delete('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    Compra.deleteOne({_id:id})
        .then(data => {
            res.status(200).json({msg:'Compra deletada'});
        })
        .catch(next);
});

module.exports = router;