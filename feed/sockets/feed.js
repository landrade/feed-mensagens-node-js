module.exports = function(io, app) {
    var sockets = io.sockets,
        Mensagem = app.models.schema.Mensagem;

    sockets.on('connection', function(client) {
        var session = client.handshake.session,
            usuario = session.usuario;

        client.on('envia-nova-mensagem', function(data) {
            criaNovaMensagem(data, function(err, result) {
                if (!err && result) {
                    enviaNovaMensagemParaTodosOsClientes(result);
                }
            });
        });

        var criaNovaMensagem = function(data, callback) {
            if (!data.msg) {
                callback(new Error('Mensagem não pode ser nula'));
            }

            Mensagem.create({
                corpo: data.msg,
                autor: usuario.nome,
                avatar: usuario.avatar
            }).success(function(result) {
                callback(null, result);
            }).error(function(error) {
                callback(error);
            });
        };

        var enviaNovaMensagemParaTodosOsClientes = function(mensagem) {
            app.render('feed/partials/mensagem', {
                mensagem: {
                    id: mensagem.id,
                    corpo: mensagem.corpo,
                    autor: mensagem.autor,
                    avatar: mensagem.avatar,
                    enviadoEm: mensagem.enviadoEm
                }
            }, function(error, html) {
                client.emit('recebe-nova-mensagem', html);
                client.broadcast.emit('recebe-nova-mensagem', html);
            });
        };

        var enviarMensagensAntigasParaOCliente = function() {
            Mensagem.antigas(null, function(error, result) {
                if (error) {
                    console.log(error);
                    return;
                }
                app.render('feed/partials/mensagens', result, function(err, html) {
                    client.emit('recebe-mensagens-antigas', html);
                });
            });
        };

        enviarMensagensAntigasParaOCliente();

    });
};
