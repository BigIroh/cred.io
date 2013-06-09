module.exports = function(app){

	app.get("/", function(req, res){
		
		var opt = {
      locals: {
        page_id:"page-home",
        user: req.user || {json:{profile_image_url:"", balance:"¢5000", name:"Matt"}}
      },
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