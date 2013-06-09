var base_url = "http://localhost:5000/credlet/";

var run = function(){
	if(jQuery!=undefined){
		var content_url = encodeURIComponent(document.URL);
		var url = base_url+content_url+"?callback=?";
		console.log("URL", url);
		jQuery.getJSON(url, {}).done(function(data){
			
			var h = document.createElement('div');
			h.setAttribute('id', 'credio_credlet_div');
			document.body.appendChild(h);

			var css = '#credio_credlet_div{ z-index: 2147483642!important; width: 100%; height: '+document.height+'px; position: absolute; top: 0; left: 0;background-color: rgba(33,33,33,.95); text-align: center; padding: 50px;}';
	    var head = document.getElementsByTagName('head')[0];
	    var style = document.createElement('style');

			style.type = 'text/css';
			if (style.styleSheet){
			  style.styleSheet.cssText = css;
			} else {
			  style.appendChild(document.createTextNode(css));
			}

			head.appendChild(style);

			$("#credio_credlet_div").html(data.html);

			$("#credio_credlet_div").on("click", function(){
				$("#credio_credlet_div").remove();
			});

		}).fail(function(err){
			console.log("ERROR", err)
		});
	}
	else{
		setTimeout(run, 10);
	}
}

run();

