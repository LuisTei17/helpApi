var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function() {
    var materialSchema = new Schema({
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
        quantidade: {
            type: Number, min: 0
        }
    })

    return mongoose.model('Material', materialSchema);
}