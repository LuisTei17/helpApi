var mongoose = require('mongoose');

// Usuario Schema
module.exports = function(){
	var UsuarioSchema = mongoose.Schema({
		name: {
			type: String
		},
		caminhoImagem: {

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
		categorias: [],
		insignias: []
	});
	return mongoose.model('Usuario', UsuarioSchema);
}
