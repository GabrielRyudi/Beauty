var express = require('express');
var router = express.Router();

router.use('/cliente', require('./Cliente'));
router.use('/fornecedor', require('./Fornecedor'));
router.use('/funcionario', require('./Funcionario'));
router.use('/produto', require('./Produto'));
router.use('/transacao', require('./Transacao'));
router.use('/compra', require('./Compra'));
router.use('/usuario', require('./User'));
router.use('/agenda', require('./Agenda'));
router.use('/historico', require('./Historico'));

module.exports = router;