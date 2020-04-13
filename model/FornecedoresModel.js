var mongoose = require('mongoose');

var FornecedorSchema = mongoose.Schema({
    nome: String,
    celular: String,
    marca: String,
    obs: String
});

var Fornecedor = mongoose.model('Fornecedor', FornecedorSchema);

module.exports = Fornecedor;
