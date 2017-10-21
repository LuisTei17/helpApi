var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function() {
    var CategoriaSchema = mongoose.Schema({
        titulo: {
            type: String,
            index:true
        }
    })
    return mongoose.model('Categorias', CategoriaSchema);
}