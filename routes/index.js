module.exports = function(app){

  app.get("/", function(req, res) {
    req.user = req.user || {json:{name:"Matt"}}
    req.user.json.balance = '¢5000';
    var opt = {
      locals: {
        page_id: "page-home",
        user: req.user
      },
      blocks: {
        content:{
          filename:"views/content.ejs",
          locals: {
            user: req.user
          }
        }
      }
    }

    res.render('layouts/single', opt);
  }); 


}