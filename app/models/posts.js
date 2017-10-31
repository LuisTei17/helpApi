var mongoose = require('mongoose');
var Schema = mongoose.Schema
module.exports = function() {
  var PostSchema = mongoose.Schema({
    titulo: {
      type: String,
      index:true
    },
    texto: {
      type: String
    },
    autor: {
      type: Schema.Types.ObjectId, ref: 'Instituicoe' 
    },
    nomeAutor: {
      type: String
    },
    data: {
      type: String
    },
    categoria: {
      type: String
    }
  })

  return mongoose.model('Post', PostSchema);
}
