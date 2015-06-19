module.exports = function(app) {
    var request = require('request'),
        Mensagem = app.models.schema.Mensagem;

    var carregarDadosIniciais = function(callback) {
        var url = 'https://gist.githubusercontent.com/daviferreira/fed4c91630ace8235811/raw/35b78b7af28aaac15d75f27d25360daed9ed16c3/gistfile1.json';
        request({
            url: url,
            json: true
        }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var mensagens = body.postList,
                    mensagensParaSeremGravadas = [];

                for (var i = mensagens.length - 1; i >= 0; i--) {
                    var mensagem = mensagens[i];
                    var imagem = null;

                    if (mensagem.images && mensagem.images.length > 0) {
                        imagem = mensagem.images[0].url;
                    } else if (mensagem.videos && mensagem.videos.length > 0) {
                        imagem = 'images/video_placeholder.jpg';
                    }

                    mensagensParaSeremGravadas.push({
                        corpo: mensagem.body,
                        autor: mensagem.author.name,
                        avatar: mensagem.author.avatar,
                        enviadoEm: mensagem.createdAt,
                        imagem: imagem
                    });
                }

                mensagensParaSeremGravadas.sort(function(m1, m2) {
                    if (new Date(m1.enviadoEm) > new Date(m2.enviadoEm)) return 1;
                    if (new Date(m1.enviadoEm) < new Date(m2.enviadoEm)) return -1;
                    return 0;
                });

                Mensagem.bulkCreate(mensagensParaSeremGravadas)
                    .then(function() {
                        callback();
                    }, function(error) {
                        console.log(error);
                    });
            }
        });
    };

    var Boot = {
        start: function(callback) {
            console.log('Sincronizando Banco de dados');
            app.models.schema.sequelize.sync().then(function() {
                console.log('Verificando dados previamentes inputados do JSON');
                Mensagem.count().then(function(c) {
                    if (c === 0) {
                        console.log('Carregando dados do JSON');
                        carregarDadosIniciais(callback);
                    } else {
                        console.log('JSON já carregado anteriormente');
                        callback();
                    }
                });
            });
        }
    };

    return Boot;

};
