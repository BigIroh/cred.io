module.exports = function(app){

	app.get("/", function(req, res){
		res.send("Do you have any credio?");
	});

}