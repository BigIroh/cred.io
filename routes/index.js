module.exports = function(app){

	app.get("/", function(req, res){
		
		var opt = {
      locals: {page_id:"page-home"},
      blocks: {
        content:{
          filename:"views/home.ejs"
        }
      }
    }

    res.render('layouts/single', opt);

	});

}