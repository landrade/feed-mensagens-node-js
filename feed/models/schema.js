var path = require('path'),
    fs = require('fs'),
    lodash = require('lodash'),
    Sequelize = require('sequelize'),
    sequelize = null,
    schema = null,
    db = {};

module.exports = function(app) {
    if (!schema) {
        if (!sequelize) {
            sequelize = new Sequelize('feed-database', null, null, {
                dialect: 'sqlite',
                storage: __dirname + '/../../database/feed-database.sqlite',
                logging: false
            });
        }
        fs.readdirSync(__dirname)
            .filter(function(file) {
                return (file.indexOf('.') !== 0) && (file !== 'schema.js');
            })
            .forEach(function(file) {
                var model = sequelize.import(path.join(__dirname, file));
                db[model.name] = model;
            });

        Object.keys(db).forEach(function(modelName) {
            if ('associate' in db[modelName]) {
                db[modelName].associate(db);
            }
        });

        schema = lodash.extend({
            Sequelize: Sequelize,
            sequelize: sequelize
        }, db);
    }
    return schema;

};
