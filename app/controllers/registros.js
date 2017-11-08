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
    var nome = req.body.nome;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var categorias = req.body.categorias;

    nomeExiste = typeof nome != undefined;
    emailExiste = typeof email != undefined;
    usernameExiste = typeof username != undefined;
    passwordExiste = typeof password != undefined;
    password2Existe = typeof nome != undefined;
    categoriasExiste = typeof categorias != undefined;

    if(!nomeExiste || !emailExiste || !usernameExiste || !passwordExiste || !password2Existe || !categoriasExiste ) {
      return res.status(500).json({msg: "Erro, campo(s) vazio"});
    }
    if(password != password2) {
      return res.status(500).json({msg: "Erro, senhas não coincidem"});
    }
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        var newUser = new User({
          nome: nome,
          email:email,
          username: username,
          password: hash,
          tipo: "usuario",
          categorias: categorias
        });
        newUser.save(function(err){
          if(err) {
            res.status(500).json({"msg": "Erro ao salvar"});
          } else {
            res.status(200).json({"msg": "Salvo"});
          }
        });
        
      });
    });  
  };
  controller.registroEmpresa = function(req, res){
    var cnpj = req.body.cnpj
    var nome = req.body.nome;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var categorias = req.body.categorias;

    nomeExiste = typeof nome != undefined;
    cnpjExiste = typeof cnpj != undefined;
    emailExiste = typeof email != undefined;
    usernameExiste = typeof username != undefined;
    passwordExiste = typeof password != undefined;
    password2Existe = typeof nome != undefined;
    categoriasExiste = typeof categorias != undefined;

    if(!nomeExiste || !emailExiste || !usernameExiste || !passwordExiste || !password2Existe || !categoriasExiste || !cnpjExiste ) {
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
          nome: nome,
          email:email,
          username: username,
          tipo: "empresa",
          password: passwordHash,
          categorias: categorias
        });
        newEmpresa.save(function(err){
          if(err) {
            res.status(500).json({"msg": "Erro ao salvar"});
          } else {
            res.status(200).json({"msg": "Salvo"});
          }
        });
      });
    });
  };

  controller.registroInstituicao = function(req, res){
    var cnpj = req.body.cnpj
    var nome = req.body.nome;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var categorias = req.body.categorias;

    nomeExiste = typeof nome != undefined;
    cnpjExiste = typeof cnpj != undefined;
    emailExiste = typeof email != undefined;
    usernameExiste = typeof username != undefined;
    passwordExiste = typeof password != undefined;
    password2Existe = typeof nome != undefined;
    categoriasExiste = typeof categorias != undefined;

    if(!nomeExiste || !emailExiste || !usernameExiste || !passwordExiste || !password2Existe || !categoriasExiste || !cnpjExiste ) {
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
          nome: nome,
          email:email,
          tipo: "instituicao",
          username: username,
          password: passwordHash,
          categorias: categorias
        });
        newInst.save(function(err){
          if(err) {
            res.status(500).json({"msg": "Erro ao salvar"});
          } else {
            res.status(200).json({"msg": "Salvo"});
          }
        });
      });
    })
  }
  return controller;
}