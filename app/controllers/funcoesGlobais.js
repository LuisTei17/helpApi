var bcrypt = require('bcryptjs');
/**
 * Arquivo que guarda funções para uso global na api
 */
module.exports = function() {
    var funcoes = {};
    /**
     * Função Assíncrona hashGen que gera um hash 
     * usando brypt.
     */
    funcoes.hashGen = function(res,pass) {
        bcrypt.hash(pass, null, null, null, function(err, hash) {
          if(err) {
            return res.json({'msg': "Erro ao criar a senha"});
          }
          return hash;
        } )
    }

    /**
     * Função Assíncrona para ver se a senha está
     * certa.
     */
    funcoes.compara = function(res, senhaTexto, senhaHash) {
      bcrypt.compare(senhaTexto, senhaHash, function(err, res) {
        if(err) {
         return res.json({msg: 'Erro ao validar senha'}); 
        }
        return true;
      })
    }

    return funcoes;
}