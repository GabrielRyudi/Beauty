var mongoose = require('mongoose');
    
var FuncionarioSchema = mongoose.Schema({
    nome: String,
    celular: String,
    obs: String
});

var Funcionario = mongoose.model('Funcionario', FuncionarioSchema);

module.exports = Funcionario;