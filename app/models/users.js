var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Usuario Schema
module.exports = function(){
	var UsuarioSchema = mongoose.Schema({
		name: {
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
		categorias: []
	});
	return mongoose.model('Usuario', UsuarioSchema);
}
