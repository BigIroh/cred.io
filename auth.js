var database = require('./database');

module.exports = function(token, tokenSecret, profile, done) {
	profile.token = token;
	profile.tokenSecret = tokenSecret;
	database.insertUser(profile, done)
}