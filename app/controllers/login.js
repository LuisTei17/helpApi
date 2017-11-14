// Importando aqruivos
var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs')

module.exports = function(app){

  // Definindo array de controllers
  var controller = {};
  // Carrega models
  var TipoUsuario = app.models.tiposUsuarios;
  var Categorias = app.models.categorias;
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

    console.log(req.body)

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
            return res.status(404).json({"msg": "Usuario não encontrado"});
          } 
          else if(user) {
            bcrypt.compare(passLogin, user.password, function(err, senhaCorreta) {
              if(senhaCorreta) {
                var token = jwt.sign(user, app.get('superSecret'), {
                  expiresIn: 60*8*60
                });
                req.session.token = token;
                req.session.save();
                return res.status(200).json({token});
              }
              
              return res.status(500).json({"msg":"Senha errada"});
              // Criando token jwt e salvando-o na sessão
                
            })
          }
        else {
          res.json({err: "Not found"})
        } 
      })
    }
  }

  /**
   * Controller que retorna as categorias
   */
  controller.retornaCategorias = function(req, res) {
    Categorias.find({}, function(err, docs) {
      if(!err) {
        return res.status(200).json(docs);
      } else {
        throw err;
      }
    });
  }

  /**
   * Controller que retorna os tipos de usuários
   */
  controller.retornaTiposUsuarios = function(req, res) {
    TipoUsuario.find({}, function(err, docs) {
      if(!err) {
        res.status(200).json(docs);
      } else {
        throw err;
      }
    });
  }

  /**
   * Controller que valida se o usuário
   * com token válido ou não
   */
  controller.validaUsuario = 	function(req, res, next){
    var token = req.query.token || req.body.token;
		if (token) {
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {
				if (err) {
          return res.status(404).json({"msg": 'Erro ao validar token'});
          
				} else {
				  return next();
				}
			});
		} else {
			return res.status(404).json({"msg": 'Erro: nenhum token enviado  '});
		}
	}

  /**
   * Controller que devolve usuário baseado no token
   */
  controller.autenticaUsuario = 	function(req, res, next){
    var token = req.query.token || req.body.token;
    if (token) {
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {

          return res.status(404).json({"msg": 'Erro ao validar token'});
          
        } else {
          var usuario = decoded._doc;
          usuario = JSON.stringify(usuario)
          console.log(usuario)
          return res.status(200).json(usuario);
        }
      });
    } else {
      return res.status(404).json({"msg": 'Erro: nenhum token enviado  '});
    }
  } 
  return controller;
}
