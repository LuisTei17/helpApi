module.exports = function(app) {
    var controller = app.controllers.perfil;
    var loginController = app.constrollers.login;

    // Rota para perfil que recebe id e tipo 
    // como parametros
    app.route('v1/in/perfil').get(loginController.autenticaUsuario).post(controller.mudaDados).delete(controller.apagaPerfil);

    app.route('v1/in/perfil/material/:idMaterial?').get(controller.listaDemandasPorMateriais).post(controller.criaDemandaPorMaterial).delete(controller.removeDemandaPorMaterial);

    app.route('v1/in/perfil/trabalho/:idTrabalho?').get(controller.listaDemandasPorTrabalhos).post(controller.criaDemandaPorTrabalho).delete(controller.removeDemandaPorTrabalho);


}