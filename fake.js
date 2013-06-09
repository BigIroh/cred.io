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

var tweleve_days = 1000*60*60*24*12;

var notSoRandom = function(lessThanThis, rangeLeft){
	var max = (lessThanThis/rangeLeft)* 2;
	var num = Math.random()*max;
	return lessThanThis-Math.floor(num);
}

var makeTheValues = function(viewData){

	var last_value = 0;
	var views_per_day = {
		alltime: 0,
		lastTenDays: 0,
		lastDay: 0
	}

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
	var numViews = Math.floor((timeSpan/tweleve_days)-2);

	numViews = numViews < 10 ? 10 : numViews;
	numViews = numViews > 50 ? 50 : numViews;

	while(numViews--){
		var time = video.createdTime + (numViews*tweleve_days);
		lastViews = notSoRandom(lastViews,numViews); 
		video.views[""+time] = lastViews;
	}

	video.values = makeTheValues(video.views);

	return video;
}

var videos = openVideos();

var i = videos.length;

while(i--){
	//videos[i] = fakeTheData(videos[i]);
	makeTheValues([videos[i].views]);
}

//saveVideos();

