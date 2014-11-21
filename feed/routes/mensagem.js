module.exports = function(app) {
    var autenticar = require('./../middlewares/autenticador'),
        mensagem = app.controllers.mensagem;

    app.get('/mensagem/antigas', autenticar, mensagem.antigas);
};
