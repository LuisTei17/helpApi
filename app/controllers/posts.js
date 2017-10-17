
module.exports = function(app) {
    var controller = {};
    var Post = app.models.posts;
    var Inst = app.models.instituicoes;

    controller.populaFeed = function(req, res){
        Post.find(function(err, posts) {
            if(err) {
                res.status(500).json({"msg":"Erro ao listar usuarios"})
            } else {
                res.status(200).json(posts);
            }
        })
    };

    controller.remove = function(req, res){
        var id = req.params.id;
        var idInst = req.params._idInst;

        Post.findOne({"_idInst": _idInst}, function() {

        }, function(erro) {
            res.status(404).json({"msg": "O post não é seu"});
        })
        Post.remove({"_id": id}).exec().then(function(){
            res.status(200).json({"msg":"Usuario apagado"})
        }).catch(function(err){
            res.status(404).json({"msg": "Usuario não encontrado"});
        })
    };

    /* Codigo que precisa ser revisto
    controller.editaPostagem = function(req, res){
        var _id = req.params._id;
        if(_id) {
            var titulo = req.body.titulo;
            var texto = req.body.texto;
            var autor = req.body._idInst;
            var data = req.body.data;
            var categoria = req.body.categoriaInst;
            if(!(req.body.tipo === "instituicao")) {
                res.status(500).json({"msg":"Você não é uma instituição"})
            } else {
                var newPost = new Post({
                    titulo: titulo,
                    texto: texto,
                    autor: autor,
                    data: data,
                    categoria: categoria
                });
                newPost.save(function(err, post) {
                    res.status(200);
                });
            };
        };
    };
    */
    controller.posta = function(req, res){
        var titulo = req.body.titulo;
        var texto = req.body.texto;
        var autor = req.body._idInst;
        var nomeAutor = req.body.nome;
        var data = req.body.data;
        var categoria = req.body.categoriaInst;
        var _id = req.body._id;
        
        if(_id) {
            Post.findByIdAndUpdate(_id, req.body).exec().then(function(post) {
                res.status(200).json(post);
            }, function(erro) {
                res.status(500).json({"msg": "Erro ao atualizar"});
            })
        }
        if(!(req.body.tipo === "instituicao")) {
            res.status(500).json({"msg":"Você não é uma instituição"})
        } else {
            var newPost = new Post({
                titulo: titulo,
                texto: texto,
                autor: autor,
                nomeAutor: nomeAutor,
                data: data,
                categoria: categoria
            });
            newPost.save(function(err, post) {
                if(err) {
                    res.status(500).json({"msg": "Erro ao postar"})
                } else {
                    res.status(200).json(post);
                }
            });
        }       
    };

    return controller;
} 