module.exports = function(app) {
    var controller = app.controllers.login;    
    var controllerPost = app.controllers.posts;
    app.get('/v1/in/feed', controller.validaUsuario, controllerPost.populaFeed);
    app.route("/v1/in/post").post(controllerPost.posta).delete(controllerPost.remove);
}