var auth = require('./auth');

module.exports.connection = function (socket) {
	var user;
	socket.emit('connected');
	socket.on('credentials', function (data) {
		auth(data.email, data.password, function(err, _user) {
			if(!err && user) {
				user = _user;
			}
		})
	})
	//TODO: socket shit goes here
}