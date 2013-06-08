var fs = require("fs");

var openVideos = function(){
	var data = fs.readFileSync("basedata.json", 'utf8');
	var ps = eval(JSON.parse(data));
	return ps;
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

var tweleve_hour = 1000*60*60*12;

var notSoRandom = function(lessThanThis, rangeLeft){
	var max = (lessThanThis/rangeLeft)* 2;
	var num = Math.random()*max;
	return lessThanThis-Math.floor(num);
}

var fakeTheData = function(video){

	var now = 0;
	var lastViews = 0;
	var viewTimes = Object.keys(video.views);
	var numViews = viewTimes.length;

	var iViews = numViews;
	while(iViews--){
		var viewTime = parseInt(viewTimes[iViews]);
		if(viewTime>now){
			now = viewTime;
			lastViews = video.views[viewTime];
		}
	}
	video.views[""+video.createdTime] = 0;

	var timeSpan = now-video.createdTime;
	var numViews = Math.floor((timeSpan/tweleve_hour)-2);
	console.log("VIEWS", numViews);

	while(numViews--){
		var time = video.createdTime + (numViews*tweleve_hour);
		lastViews = notSoRandom(lastViews,numViews); 
		video.views[""+time] = lastViews;
	}

	return video;
}

var videos = openVideos();

var i = videos.length;

while(i--){
	videos[i] = fakeTheData(videos[i]);
}

saveVideos();

