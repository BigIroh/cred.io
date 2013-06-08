module.exports = function(app){

	app.get("/:contentid", function(req, res){
		res.send("CONTENT "+req.params.contentid);
	});	

}