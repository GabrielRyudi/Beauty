var express = require('express');
var router = express.Router();
var mongoose = require('../database/mongoose');
var Agenda = require('../model/AgendaModel');
var auth = require('../config/auth');

//Adicionar
router.post('/', auth, (req, res, next) => {
    const {cliente, horario, funcionario, dia, servico} = req.body;
    const situacao = 'A atender';
    const pago = false;
    let newAgenda = new Agenda({
        cliente,
        horario,
        funcionario,
        dia,
        servico,
        situacao,
        pago
    });
    newAgenda.save()
        .then(data => {
            res.status(201).json({msg: 'Horario salvo com sucesso!'});
        })
        .catch(next);
});

//Listar
router.get('/', auth, (req, res, next) => {
    Agenda.find({})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Pesquisar por data - dia, mes ou ano
router.get('/agendas', auth, (req, res, next) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '-' + dd + '-' + yyyy;
    Agenda.find({dia:today})
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

//Editar transação
router.put('/', auth, (req, res, next) => {
    var {id} = req.body;
    var {cliente, horario, funcionario, dia, servico, situacao, pago} = req.body;
    Agenda.updateOne({_id:id},{cliente:cliente, horario:horario, funcionario:funcionario, dia:dia, servico:servico, situacao:situacao, pago:pago})
        .then(data => {
            res.status(200).json({msg:'Trasação editada com sucesso!'});
        })
        .catch(next);
});

//Situação e pagamento
router.put('/service', auth, (req, res, next) => {
    var {id} = req.body;
    var {situacao, pago} = req.body;
    Agenda.updateOne({_id:id},{situacao:situacao, pago:pago})
        .then(data => {
            res.status(200).json({msg:'Trasação editada com sucesso!'});
        })
        .catch(next);
});

//Deletar transação
router.delete('/:id', auth, (req, res, next) => {
    var {id} = req.params;
    Agenda.deleteOne({_id:id})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});

module.exports = router;