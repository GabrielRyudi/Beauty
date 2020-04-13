var mongoose = require('mongoose');

var TransacoesSchema = mongoose.Schema({
    tipo: String,
    transacao: String,
    quantia: Number,
    data: Date,
    pessoa: String
});

var Transacoes = mongoose.model('Transacaoes', TransacoesSchema);

module.exports = Transacoes;

