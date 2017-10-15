// Importando aqruivos
var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs')

module.exports = function(app){

  // Definindo array de controllers
  var controller = {};
  var funcoes = app.controllers.funcoesGlobais;
  var Usuario = app.models.users;
  var Empresa = app.models.empresas;
  var Instituicao = app.models.instituicoes;

  /**
   * Controller responsável por controlar o login
   */
  controller.login = function(req, res){
    var tipo = req.body.tipo;

    // Verifica qual o tipo de User para 
    // buscar no banco
    if(tipo === "empresa") {
      var User = Empresa;
    } else if(tipo === "usuario") {
      var User = Usuario;
    } else if(tipo === "instituicao") {
      var User = Instituicao;
    }
    var passLogin = req.body.password;
    var userExiste = User;
    if(userExiste) {
      User.findOne({
        username: req.body.username
        },function(err, user){
          if(!user) {
            res.mensagem = 'Usuario não encontrado';
            res.status(404).json({"msg": res.mensagem});
        } else if(user) {       
            if(funcoes.compara(res, passLogin, user.password)) {
              res.menssagem = 'Senha errada'
              return res.status(404).json({"msg": res.mensagem});
            }
            else {
              // Criando token jwt e salvando-o na sessão
              var token = jwt.sign(user, app.get('superSecret'), {
                expiresIn: 60*8*60
              });
              req.session.token = token;
              req.session.save();
              return res.status(200).json({token});
              
            }
        }
      });
    }
    else {
      res.json({err: "Not found"})
    }
  }
  /**
   * Controller que visa validar se o usuário
   * com token válido ou não
   */
  controller.validaUsuario = 	function(req, res){
    var token = req.body.token || req.session.token;
    
		if (token) {
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {
				if (err) {
					return res.status(404).json({"msg": 'Erro ao validar token'});
				} else {
					req.user = decoded._doc;
					res.status(200).json(req.user);
				}
			});
		} else {
			res.status(404).json({"msg": 'Erro: nenhum token enviado  '});
		}
	}
  return controller;
}
