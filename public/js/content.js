var frame = $('iframe');
var width = frame.attr('width');
var multi = $(window).width()/width;
frame.width($(window).width()).height(frame.height()*multi);

