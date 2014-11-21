module.exports = function(app) {
    var HomeController = {
        index: function(req, res) {
            res.render('home/index');
        },
        entrar: function(req, res) {
            var nome = req.body.nome,
                avatar = req.body.avatar;

            if (nome) {
                var usuario = {
                    nome: nome,
                    avatar: avatar
                };
                req.session.usuario = usuario;
                res.redirect('/feed');
            } else {
                res.render('home/index', {
                    usuarioError: true
                });
            }
        }        
    };

    return HomeController;
};
