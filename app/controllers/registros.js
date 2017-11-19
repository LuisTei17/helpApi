var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs')

module.exports = function(app){
  
  // Constante que determina como será constituida a senha
  const saltRounds = 10;
  var User = app.models.users;
  var Empresa = app.models.empresas;
  var Instituicao = app.models.instituicoes;

  var controller = {};

  controller.registroUsuario = function(req, res){
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var categorias = req.body.categorias;

    emailExiste = email != undefined;
    usernameExiste = username != undefined;
    passwordExiste = password != undefined;
    password2Existe = password2 != undefined;
    categoriasExiste = categorias != undefined;

    if(!emailExiste || !usernameExiste || !passwordExiste || !password2Existe || !categoriasExiste ) {
      return res.status(500).json({msg: "Erro, campo(s) vazio"});
    }
    if(password != password2) {
      return res.status(500).json({msg: "Erro, senhas não coincidem"});
    }
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        var newUser = new User({
          email:email,
          username: username,
          password: hash,
          tipo: "usuario",
          categorias: categorias
        });
        User.findOne({username:newUser.username}, function(err, user) {
          if(!user) {
            newUser.save(function(err){
              if(err) {
                res.status(500).json({"msg": "Erro ao salvar"});
              } else {
                res.status(200).json({"msg": "Salvo"});
              }
            });
          } else {
            return res.status(500).json({"msg":"Usuario já existe"})
          }
        })
        
      });
    });  
  };
  controller.registroEmpresa = function(req, res){
    var cnpj = req.body.cnpj
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var categorias = req.body.categorias;
    

    cnpjExiste = cnpj == undefined;
    emailExiste = email == undefined;
    usernameExiste = username == undefined;
    passwordExiste = password == undefined;
    password2Existe = password2 == undefined;
    categoriasExiste = categorias == undefined;


    if(emailExiste || usernameExiste || passwordExiste || password2Existe || categoriasExiste || cnpjExiste ) {
      return res.status(500).json({msg: "Erro, campo(s) vazio"});
    }
    if(password != password2) {
      return res.status(500).json({msg: "Erro, senhas não coincidem"});
    }

    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        var passwordHash = hash;
        var newEmpresa = new Empresa({
          cnpj: cnpj,
          email:email,
          username: username,
          tipo: "empresa",
          password: passwordHash,
          categorias: categorias
        });
        Empresa.findOne({username:newEmpresa.username}, function(err, empre) {
          if(!empre) {
            newEmpresa.save(function(err){
              if(err) {
                return res.status(500).json({"msg": "Erro ao salvar"});
              } else {
                return res.status(200).json({"msg": "Salvo"});
              }
            });
          } else {
            return res.status(500).json({"msg":"Empresa já existente"})
          }
        })
      });
    });
  };

  controller.registroInstituicao = function(req, res){
    var cnpj = req.body.cnpj
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var categoria = req.body.categoria;

    cnpjExiste = cnpj != undefined;
    emailExiste = email != undefined;
    usernameExiste = username != undefined;
    passwordExiste = password != undefined;
    password2Existe = password2 != undefined;
    categoriasExiste = categoria != undefined;

    if(!emailExiste || !usernameExiste || !passwordExiste || !password2Existe || !categoriasExiste || !cnpjExiste ) {
      return res.status(500).json({msg: "Erro, campo(s) vazio"});
    }
    if(password != password2) {
      return res.status(500).json({msg: "Erro, senhas não coincidem"});
    }

    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        var passwordHash = hash;
        var newInst = new Instituicao({
          cnpj: cnpj,
          email:email,
          tipo: "instituicao",
          username: username,
          password: passwordHash,
          categorias: categoria
        });
        Instituicao.findOne({username:newInst.username}, function(err, inst) {
          if(!inst) {
            newInst.save(function(err){
              if(err) {
                return res.status(500).json({"msg": "Erro ao salvar"});
              } else {
                return res.status(200).json({"msg": "Salvo"});
              }
            });
          } else {
            return res.status(500).json({"msg": "Instituição já existente"});
          }
        })
      });
    })
  }
  return controller;
}