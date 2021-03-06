var express = require('express');
var jwt = require('jsonwebtoken');
var path = require('path');

module.exports = function(app){
	var controller = app.controllers.login;
	var controllerRegistro = app.controllers.registros;



	// Aplica middlware apiRoutes a todas as rotas com "/in" antes
	app.use('/v1/in/*', controller.validaUsuario);

	app.get('/v1/categorias', controller.retornaCategorias);
	app.get('/v1/usuarios', controller.retornaTiposUsuarios)

	// Operações de registro
	app.route('/v1/registroUsuario').post(controllerRegistro.registroUsuario);
	app.route('/v1/registroEmpresa').post(controllerRegistro.registroEmpresa);
	app.route('/v1/registroInstituicao').post(controllerRegistro.registroInstituicao);

	app.route('/v1/login').post(controller.login);

	app.route(`/v1/in/profile`).post(controller.validaUsuario);
	app.get('/v1/in/logout', function(req, res){
		req.session.token =  null;
		res.status(200).json({"msg": "Deslogado"});
	});

	app.route('/v1/autentica').get(controller.autenticaUsuario);

	

}
