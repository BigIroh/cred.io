module.exports = function(app){

	app.get("/", function(req, res){
		
		var opt = {
      locals: {page_id:"page-home"},
      blocks: {
        content:{
          filename:"views/home.ejs",
          locals: {}
        }
      }
    }

    res.render('layouts/single', opt);

	});

}