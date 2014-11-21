var _xssLib = require('xss');

exports.escape = function(str, options) {
    return _xssLib(str, options);
};