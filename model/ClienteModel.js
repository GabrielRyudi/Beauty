var mongoose = require('mongoose');

var ClienteSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    celular:{
        type: String,
        required: true
    },
    rua:{
        type: String,
        required: true
    },
    bairro:{
        type: String
    },
    cidade:{
        type: String
    },
    numero:{
        type: Number
    },
    datanasc:{
        type: Date
    },
    obs: {
        type: String
    }
});

var Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;
