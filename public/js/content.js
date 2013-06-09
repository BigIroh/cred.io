$('.button').each(function() {
	var el = $(this);
	var caption = el.find('.caption');
	var render = function() {
		var active = caption.hasClass('active');
		if(active) {
			el.find('active').show();
			el.find('inactive').hide();
		} else {
			el.find('inactive').show();
			el.find('active').hide();
		}
	}
	render();
	el.click(function() {
		caption.toggleClass('active');
		render();
	})
})