var database = require('./database');

module.exports = function(token, tokenSecret, profile, done) {
	profile.token = token;
	profile.tokenSecret = tokenSecret;
	database.insertUser(profile, function(err, user) {
		console.log('err', err);
		console.log('user', user);
		done(err, user);
	})
}