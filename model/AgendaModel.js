var mongoose = require('mongoose');

var AgendaSchema = mongoose.Schema({
    cliente: {
        type: String,
        required: true
    },
    horario:{
        type: String,
        required: true
    },
    funcionario:{
        type: String,
        required: true
    },
    dia:{
        type: Date,
        required: true
    },
    servico:{
        type: String,
        required: true
    },
    situacao:{
        type: String
    },
    pago:{
        type: Boolean
    }
});

var Agenda = mongoose.model('Agenda', AgendaSchema);

module.exports = Agenda;
