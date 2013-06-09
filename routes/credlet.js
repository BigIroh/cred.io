module.exports = function(app){

	app.get("/credlet/:encodedUrl", function(req, res){
		
		res.render("credit", {}, function(err, html){

			console.log();

			html = html.replace("src=\"", 'src="http://'+req.headers.host);

			var out = {};
			out.err = err;
			out.html = html;
			res.jsonp(out);
		});
		
	});

}