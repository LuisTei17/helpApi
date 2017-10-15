
module.exports = function(app) {
    var funcoes = app.controllers.funcoesGlobais;
    var Demanda = app.models.demandas;
    var User = app.models;
    var Material = app.models.materials;
    var Trabalho = app.models.trabalhos;
    var Usuario;
    var controller = {}
    var id;



    //Controler que carrega as informações do perfil
    controller.carregaPerfil = function(req, res){
        var id = req.params.id;
        var tipo = req.params.tipo;
        if(tipo === "usuario") {
            Usuario = User.users;
        } else if(tipo === "empresa") {
            Usuario = User.empresas;
        } else if(tipo === "instituicao") {
            Usuario = User.instituicoes;
        }
           
        Usuario.findOne({"_id": id}, function(err, user) {
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({"msg": "Error ao procurar perfil"});
            }
        });
    };

    // Controller para editar dados do usuário
    controller.mudaDados = function(req, res){
        var id = req.params.id;
        var tipo = req.params.tipo;
        if(tipo === "usuario") {
           Usuario = User.users;
        } else if(tipo === "empresa") {
           Usuario = User.empresas;
        } else if(tipo === "instituicao") {
           Usuario = User.instituicoes;
        }

        Usuario.findByIdAndUpdate(id, req.body).exec().then(function(newUser) {
            res.status(200).json({"msg": "Usuario alterado com sucesso", newUser})
        }, function(erro) {
            res.status(404).json({"msg": "Erro ao atualizar dados"});
        })
    };

    /**
     * Controller que apaga perfil do usuário
     * com base no id que recebeu
     */
    controller.apagaPerfil = function(req, res){
        var id = req.params.id;
        var tipo = req.params.tipo;
        if(tipo === "usuario") {
           Usuario = User.users;
        } else if(tipo === "empresa") {
           Usuario = User.empresas;
        } else if(tipo === "instituicao") {
           Usuario = User.instituicoes;
        }
        Usuario.remove({"_id":id}).exec().then(function(){
            res.status(200).json({"msg":"Deletado com sucesso"});
        }, function(erro) {
            res.status(500).json({"msg": "Erro ao deletar usuario"});
        })

    };  

    /**
     * Controller para listar materiais que estejam
     * sendo requisitados por instituições de caridade
     */
    controller.listaDemandasPorMateriais = function(req, res){
        Material.find(function(err, materiais) {
            if(err) {
                console.log(err);
                res.status(500).json({"msg": "Erro ao listar demandas por materiais"});
            } else {
                res.status(200).json(materiais);
            }
        })
    }

    /**
     * Controller que cria uma demanda por determinado
     * material requisitado pela instituição
     */
    controller.criaDemandaPorMaterial = function(req, res){
        var instituicao = req.params.id;
        var titulo = req.body.titulo;
        var data = req.body.data;
        var descricao = req.body.descricao;
        var quantidade = req.body.quantidade;
        var tipo = req.params.tipo;
        var idMaterial = req.params.idMaterial;
        var newMaterial = new Material({
            instituicao: instituicao,
            titulo: titulo,
            data: data,
            descricao: descricao,
            quantidade: quantidade
        })

        var materialUpdate = {
            instituicao: instituicao,
            titulo: titulo,
            data: data,
            descricao: descricao,
            quantidade: quantidade
        }

        if(idMaterial) {
            Material.findByIdAndUpdate(idMaterial, materialUpdate).exec().then(function(newMaterial) {
                res.status(200).json({"msg": "Demanda alterada com sucesso", newMaterial})
            }, function(erro) {
                console.log(erro + "!!!!!!!!!!!!! ERRO");
                res.status(404).json({"msg": "Erro ao atualizar dados"});
            })
        } else if(tipo === "instituicao"){
            newMaterial.save(function(err){
                if(err) {
                    console.log(err);
                    res.status(500).json({"msg":"Erro ao salvar material no banco"});
                }
                res.status(200).json({"msg":"Demanda salva"});
            })
        } else {
            res.status(500).json("Você precisa entrar como instituição");
        }
    };

    controller.removeDemandaPorMaterial = function(req, res){
        var id = req.params.idMaterial;  
        Material.remove({"_id":id}).exec().then(
            function() {
                res.status(200).json({"msg": "Demanda excluída"});
            }, 
            function(erro) {
                res.status(500).json({"msg": "Erro ao excluir"});
            }
        )
    }

    controller.listaDemandasPorTrabalhos = function(req, res){
        Trabalho.find(function(err, trabalhos) {
            if (err) {
                console.log(err + "!!! Erro ao listar demandas por trabalho");
                res.status(500).json({"msg":"Erro ao listar as demandas por trabalhos"});
            };
            res.status(200).json(trabalhos);
        })
    }

    controller.criaDemandaPorTrabalho = function(req, res){
        var instituicao = req.params.id;
        var titulo = req.body.titulo;
        var data = req.body.data;
        var descricao = req.body.descricao;
        var horas = req.body.horas;
        var numeroPessoas = req.body.numeroPessoas;
        var tipo = req.params.tipo;

        var idTrabalho = req.params.idTrabalho;

        var trabalho = {
            instituicao: instituicao,
            titulo: titulo,
            data: data,
            descricao: descricao,
            horas: horas,
            numeroPessoas: numeroPessoas
        }

        var newTrabalho = new Trabalho(trabalho);

        if(idTrabalho) {
            Trabalho.findByIdAndUpdate(idTrabalho, trabalho).exec().then(function(newTrabalho) {
                res.status(200).json({"msg": "Demanda alterada com sucesso", newTrabalho})
            }, function(erro) {
                console.log(erro + "!!!!!!!!!!!!! ERRO");
                res.status(404).json({"msg": "Erro ao atualizar dados"});
            })
        } else if(tipo === "instituicao") {
            newTrabalho.save(function(err){
                if(err){
                    console.log(err)
                    console.log("Erro ao salvar demanda por trabalho no banco");
                    res.status(500).json({"msg": "Erro no banco"});
                }
                res.status(200).json({"msg": "Demanda salva"});
            });
        } else {
            res.status(500).json({"msg": "Você precisa entrar como instituição"});
        }
    };

    controller.removeDemandaPorTrabalho = function(req, res){
        var id = req.params.idTrabalho;
        Trabalho.remove({"_id":id}).exec().then(
            function() {
                res.status(200).json({"msg": "Demanda excluída"});
            }, 
            function(erro) {
                res.status(500).json({"msg": "Erro ao excluir"});
            }
        )
    }


    return controller;
}