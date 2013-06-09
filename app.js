var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var express = require('express');
var socket = require('./socket');
var auth = require('./auth');
var nano = require('nano');
var app = express();

/*** ================================================================================== */
/** ================================= SETUP PASSPORT ================================= **/
/* ================================================================================== ***/

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, auth));

/*** ================================================================================== */
/** ================================= CONFIG EXPRESS ================================= **/
/* ================================================================================== ***/

app.use(express.favicon());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'the one ring' })); //Keep it safe
app.use(passport.initialize());
app.use(passport.session());
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

/*** ================================================================================== */
/** ================================= INIT ENDPOINTS ================================= **/
/* ================================================================================== ***/

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

//routes
require("./routes/index")(app);
require("./routes/content")(app);
require("./routes/user")(app);


/*** ================================================================================== */
/** ======================== INIT SOCKET.IO AND START SERVER ========================= **/
/* ================================================================================== ***/

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

io.sockets.on('connection', socket.connection);

var port = process.env.PORT || 5000;
server.listen(port);
