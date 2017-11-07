var mongoose = require('mongoose');

module.exports = function() {
	var InstituicaoSchema = mongoose.Schema({
		nome: {
			type: String
		},
		caminhoaImagem: {

		},
		imagens: [],
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
  return mongoose.model('Instituicoe', InstituicaoSchema);
}
