var nano = require('nano')(process.env.CLOUDANT_URL);
var db = nano.use('credio', function(err) {
	console.log('exists?', !err);
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
	user.json = user._json;
	delete user._json;
	delete user._raw;

	db.insert(user, user.id_str, function(err, body) {
		console.log('body', body)
		if(err) {
			console.log(err);
			callback(err);
			return;
		}
		user._id = body.id;
		user._rev = body.rev;
		callback(null, user);
	});
}

module.exports.get = function(id, callback) {
	db.get(id, callback)
}

