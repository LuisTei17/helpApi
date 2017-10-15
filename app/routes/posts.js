module.exports = function(app) {
    var controllerPost = app.controllers.posts;
    // Rota que permite que seja enviado id e _idInst 
    // como parâmetros opcionais
    app.route("v1/in/feed/:id?/:_idInst?").get(controllerPost.populaFeed).delete(controllerPost.remove);
        
    app.route("v1/in/post/").post(controllerPost.posta);
   
}