exports.errorNotFound = function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
};

exports.tratarErros = function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
};
