module.exports = function(app) {

    var FeedController = {
        index: function(req, res) {
            res.render('feed/index', {
                usuario: req.session.usuario
            });
        }
    };

    return FeedController;
};
