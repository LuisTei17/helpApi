module.exports = function(app) {
    var controller = app.controllers.perfil;

    // Rota para perfil que recebe id e tipo 
    // como parametros
    app.route('v1/in/perfil/:id/:tipo').get(controller.carregaPerfil).post(controller.mudaDados).delete(controller.apagaPerfil);

    app.route('v1/in/perfil/:id/:tipo/material/:idMaterial?').get(controller.listaDemandasPorMateriais).post(controller.criaDemandaPorMaterial).delete(controller.removeDemandaPorMaterial);

    app.route('v1/in/perfil/:id/:tipo/trabalho/:idTrabalho?').get(controller.listaDemandasPorTrabalhos).post(controller.criaDemandaPorTrabalho).delete(controller.removeDemandaPorTrabalho);


}