var nano = require('nano')(process.env.CLOUDANT_URL);
var db = nano.use('credio', function(err) {
	if(err) {
		nano.db.create('credio');
		db = nano.use('credio');
		var views = {
			views: {
				byUrl: (function(doc) {
					emit(doc.url, doc)
				}).toString()
			}
		}
		db.insert(views, '_design/doc');
	}
})

module.exports.insertMedia = function(options, callback) {
	var defaults = {
		type: 'youtube',
		views: {},
		postDate: Date.now()
	}
	for(i in defaults) {
		if(!options[i]) {
			options[i] = defaults[i]
		}
	}
	db.insert(options, function(err, body) {
		options._id = body.id;
		options._rev = body.rev;
		callback(err, options);
	});
}

module.exports.byUrl = function(url, callback) {
	db.view('_design/doc', 'byUrl', { keys: [url] }, function(err, body) {
		if(err) {
			callback(err);
			return
		}
		callback(null, body.rows[0].value);
	})
}

module.exports.insertUser = function(user, callback) {
	db.insert(user, user.id, function(err, body) {
		user._id = body.id;
		user._rev = body.rev;
		callback(err, user);
	});
}

