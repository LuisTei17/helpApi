var mongoose = require('mongoose');

module.exports = function() {

	// Esquema do mongoose para dizer a estrutura
	// da collection
	var EmpresaSchema = mongoose.Schema({
    nome: {
      type: String
    },
    username: {
			type: String,
			index:true
		},
		password: {
			type: String
		},
		email: {
			type: String
		},
		categorias: {
			type: String
		},
		cnpj: {
			type: String
		}
	})
  return mongoose.model('Empresa', EmpresaSchema);
}
