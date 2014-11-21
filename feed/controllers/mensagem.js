module.exports = function(app) {
    var Mensagem = app.models.schema.Mensagem;

    var MensagemController = {
        antigas: function(req, res, next) {
            Mensagem.antigas({
                    aPartirId: req.query.aPartir
                },
                function(error, result) {
                    if (error) {
                        next(error);
                        return;
                    }
                    res.render('feed/partials/mensagens', result);
                });
        }
    };

    return MensagemController;
};
