javascript:void(
	(
		function(d){

			var m = d.getElementById("credio_credlet_div");

			if(m==null){

				var j=d.createElement('script');
				j.setAttribute('type','text/javascript');
				j.setAttribute('charset','UTF-8');
				j.setAttribute('src','//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js');
				d.body.appendChild(j);

				var e=d.createElement('script');
				e.setAttribute('type','text/javascript');
				e.setAttribute('charset','UTF-8');
				e.setAttribute('src','//localhost:5000/js/credlet.js?r='+Math.random()*99999999);
				d.body.appendChild(e);

			}

		}
	)(document)
);