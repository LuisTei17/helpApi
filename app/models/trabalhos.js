var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function() {
    var trabalhoSchema = new Schema({
        instituicao: {
            type: Schema.Types.ObjectId, ref: 'Instituicoe'
        },
        titulo: {
            type: String
        },
        data: {
            type: Date, default: Date.now
        },
        descricao: {
            type: String
        },
        horas: {
            type: String
        },
        numeroPessoas: {
            type: String    
        }
    })

    return mongoose.model('Trabalho', trabalhoSchema);
}