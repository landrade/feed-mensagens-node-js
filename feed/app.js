const KEY = 'feed.sid',
    SECRET = 'feed';
var express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    errors = require('./middlewares/error'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cookie = cookieParser(SECRET),
    csurf = require('csurf'),
    store = new expressSession.MemoryStore();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(cookie);
app.use(expressSession({
    secret: SECRET,
    name: KEY,
    resave: true,
    saveUninitialized: true,
    store: store
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

// Config CSRF
app.use(csurf());
app.use(function(req, res, next) {
    res.locals._csrf = req.csrfToken();
    next();
});

// Removendo header
app.disable('x-powered-by');

//compartilha sessão entre o express e o socket.io
io.use(function(socket, next) {
    var data = socket.request;
    cookie(data, {}, function(err) {
        var sessionID = data.signedCookies[KEY];
        store.get(sessionID, function(err, session) {
            if (err || !session) {
                return next(new Error('acesso negado'));
            } else {
                socket.handshake.session = session;
                return next();
            }
        });
    });
});

load('models/schema.js')
    .then('controllers')
    .then('routes')
    .into(app);

require('./sockets/feed.js')(io, app);

// error handlers
app.use(errors.errorNotFound);
app.use(errors.tratarErros);


//START
require('./boot')(app).start(function() {
    server.listen(3000, function() {
        console.log('Feed está no ar no endereço http://localhost:3000');
    });
});

module.exports = app;
