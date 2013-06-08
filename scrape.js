var cheerio = require("cheerio");
var request = require("request");
var fs = require("fs");

var videos = [];

var urls = [
	"http://www.youtube.com/watch?v=20uc9YL0hIk",
	"http://www.youtube.com/watch?v=EX28jjqu0HU",
	"http://www.youtube.com/watch?feature=player_embedded&v=mDiKZi3j-K8#!",
	"http://www.youtube.com/watch?v=40fon8AEYII"
];

var grab = function(url, callback){
	request(url, function(err, res, body){
		if(err){
			callback(err, undefined);
		}
		else{
			var $ = cheerio.load(body);
			var view_count = $(".watch-view-count").html();
			view_count = view_count.replace(/[\n\r ,]*/g,"");

			var start_datetime = $("#eow-date").html();
			start_datetime = new Date(start_datetime);
			start_datetime = start_datetime.getTime();

			var video = {
				url: url,
				type: "youtube",
				views: {},
				createdTime: start_datetime
			}

			var now = new Date();
			now = now.getTime();

			video.views[""+start_datetime] = 0;
			video.views[""+now] = view_count;

			callback(undefined, video);
		}
	});
}

var saveVideos = function(){
	fs.writeFile("basedata.json", JSON.stringify(videos), function(err) {
		if(err){
			error("ERROR");
		}
		else{
			console.log("DONE");
		}
	});
}

var addVideo = function(err, video){
	if(err){
		console.log("ERROR", err);
	}
	else{
		videos.push(video);

		if(videos.length==urls.length){
			saveVideos();
		}
	}
}


var i = urls.length;
while(i--){
	grab(urls[i], addVideo);
}