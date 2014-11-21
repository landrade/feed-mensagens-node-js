module.exports = function(sequelize, DataType) {
    var xss = require('./../utils/xss.js');
    var xssOptions = {
            whiteList: {
                a: ['href', 'target']
            }
        };

    var Mensagem = sequelize.define('Mensagem', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        corpo: {
            type: DataType.TEXT,
            set: function(value) {
                return this.setDataValue('corpo', xss.escape(value, xssOptions));
            }
        },
        autor: DataType.STRING,
        avatar: DataType.STRING,
        enviadoEm: {
            type: DataType.DATE,
            defaultValue: DataType.NOW
        },
        imagem: DataType.STRING
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: 'MENSAGENS',
        classMethods: {
            antigas: function(config, callback) {
                var _configQuery = {
                    order: 'id DESC',
                    limit: 10
                };
                if (config && config.aPartirId) {
                    _configQuery.where = {
                        id: {
                            lt: config.aPartirId
                        }
                    };
                }
                Mensagem.findAndCountAll(_configQuery)
                    .then(function(result) {
                        var mensagens = [],
                            resultLength = result.rows.length,
                            temMaisPaginas = result.count > 10,
                            ultimoId = null;

                        for (var i = 0; i < resultLength; i++) {
                            var mensagem = result.rows[i];
                            mensagens.push({
                                id: mensagem.id,
                                corpo: mensagem.corpo,
                                autor: mensagem.autor,
                                avatar: mensagem.avatar,
                                enviadoEm: mensagem.enviadoEm,
                                imagem: mensagem.imagem
                            });
                            ultimoId = mensagem.id;
                        }
                        callback && callback(null, {
                            mensagens: mensagens,
                            temMaisPaginas: temMaisPaginas,
                            ultimoId: ultimoId
                        });
                    }, function(error) {
                        callback && callback(error);
                    });
            }
        }
    });

    return Mensagem;
};
