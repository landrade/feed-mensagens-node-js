module.exports = function(app) {
    var autenticar = require('./../middlewares/autenticador'),
        feed = app.controllers.feed;

    app.get('/feed', autenticar, feed.index);
};
