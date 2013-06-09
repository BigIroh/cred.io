$('.button').each(function() {
	var el = $(this);
	el.find('.caption').each(function() {
	    var caption = $(this);
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
    	    console.log('hasclass', caption.hasClass('action'));
    		caption.toggleClass('active');
    		render();
    	})
	})
})