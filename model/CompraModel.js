var mongoose = require('mongoose');

var CompraSchema = mongoose.Schema({
    produto: String,
    fornecedor: String,
    marca: String,
    data: Date,
    preco: Number,
    quantidade: Number,
    precototal: Number,
    pago: Boolean
});

var Compra = mongoose.model('Compra', CompraSchema);

module.exports = Compra;