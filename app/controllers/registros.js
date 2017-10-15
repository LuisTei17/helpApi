var express = require('express');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');


module.exports = function(app){

  var funcoes = app.controllers.funcoesGlobais;
  var salvaResposta = app.response.respostaSalva;
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
    
    var passwordHash = funcoes.hashGen(res, password);
    var newUser = new User({
      nome: nome,
      email:email,
      username: username,
      password: passwordHash,
      categorias: categorias
    });
    newUser.save(function(err){
      if(err) {
        res.status(500).json({"msg": "Erro ao salvar"});
      } else {
        res.status(200).json({"msg": "Salvo"});
      }
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

    var passwordHash = funcoes.hashGen(res, password);
    var newEmpresa = new Empresa({
      cnpj: cnpj,
      nome: nome,
      email:email,
      username: username,
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
  };

  controller.registroInstituicao = function(req, res){
    var cnpj = req.body.cnpj
    var nome = req.body.nome;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var categorias = req.body.categorias;

    var passwordHash = funcoes.hashGen(res, password);
    var newInst = new Instituicao({
      cnpj: cnpj,
      nome: nome,
      email:email,
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
  };
  return controller;
}
