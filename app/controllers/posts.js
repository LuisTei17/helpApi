
module.exports = function(app) {
    var controller = {};
    var Post = app.models.posts;
    var Inst = app.models.instituicoes;

    controller.populaFeed = function(req, res){
        Post.find(function(err, posts) {
            if(err) {
                res.status(500).json({"msg":"Erro ao listar usuarios"})
            } else {
                var user = req.session.user
                res.status(200).json({posts:posts, user:user});
            }
        })
    };

    controller.remove = function(req, res){
        var id = req.query.id;

        Post.remove({"_id": id}).exec().then(function(){
            return res.status(200).json({"msg":"Usuario apagado"})
        }).catch(function(err){
            return res.status(404).json({"msg": "Usuario não encontrado"});
        })
    };

    controller.posta = function(req, res){


        var titulo = req.body.titulo;
        var texto = req.body.texto;
        var autor = req.body.autor;
        var nomeAutor = req.body.nome;
        var data = req.body.data;
        var _id = req.body.id;
        if(_id) {
            Post.findByIdAndUpdate(_id, req.body).exec().then(function(post) {
                return res.status(200).json(post);
            }, function(erro) {
                console.log("AAA")
                return res.status(500).json({"msg": "Erro ao atualizar"});
            })
        }
        
        var data = new Date();
        var dataConcatenada = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear();

        var newPost = new Post({
            titulo: titulo,
            texto: texto,
            autor: autor,
            data: dataConcatenada
        });

        newPost.save(function(err, post) {
            if(err) {
                console.log(err)
                return res.status(500).json({"msg": "Erro ao postar"})
            } else {
                return res.status(200).json(post);
            }
        });
    }       
    
    
    return controller;
};
 