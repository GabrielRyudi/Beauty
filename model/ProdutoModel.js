var mongoose = require('mongoose');

var ProdutoSchema = mongoose.Schema({
    nome: String,
    tipo: String,
    marca: String,
    preco: Number,
    quantidade: Number
});

var Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;