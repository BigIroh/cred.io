var TwitterStrategy = require('passport-twitter').Strategy;
var passport = require('passport');
var database = require('database');
var express = require('express');
var socket = require('./socket');
var auth = require('./auth');
var nano = require('nano');
var app = express();

/*** ================================================================================== */
/** ================================= SETUP PASSPORT ================================= **/
/* ================================================================================== ***/

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
  database.get(done)
});

passport.use(new TwitterStrategy({
	consumerKey: 'y85InTne2xLb17NKOtrdng',
	consumerSecret: '3b7ZTAh5LtES0Dl2t7XclogOIQGbd5WcRcLbbiy1s',
	callbackURL: "http://cred.io/auth/twitter/callback"
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

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
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
