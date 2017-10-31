var mongoose = require('mongoose');


module.exports = function() {
    var UsuarioSchema = mongoose.Schema({
        titulo: {
            type: String,
            index:true
        }
    })
    return mongoose.model('TipoUsuarios', UsuarioSchema);
}