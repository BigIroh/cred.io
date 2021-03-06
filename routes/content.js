module.exports = function(app){
	app.get("/:contentid", function(req, res) {
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

	app.get("/:contentid/views", function(req, res){

		var video = {
			"url":"http://www.youtube.com/watch?v=20uc9YL0hIk",
			"type":"youtube",
			"views":{
				"1370726578030":75488,
				"1306468800000":72472,
				"1305432000000":69769,
				"1304395200000":68320,
				"1303358400000":68007,
				"1302321600000":67045,
				"1301284800000":66843,
				"1300248000000":64620,
				"1299211200000":64215,
				"1298174400000":62674,
				"1297137600000":60143,
				"1296100800000":60010,
				"1295064000000":57456,
				"1294027200000":56462,
				"1292990400000":55444,
				"1291953600000":55362,
				"1290916800000":54533,
				"1289880000000":54524,
				"1288843200000":54125,
				"1287806400000":53898,
				"1286769600000":51030,
				"1285732800000":49607,
				"1284696000000":48409,
				"1283659200000":47597,
				"1282622400000":45983,
				"1281585600000":44062,
				"1280548800000":41939,
				"1279512000000":40248,
				"1278475200000":37371,
				"1277438400000":34363,
				"1276401600000":32098,
				"1275364800000":30464,
				"1274328000000":27166,
				"1273291200000":25655,
				"1272254400000":23624,
				"1271217600000":21999,
				"1270180800000":21896,
				"1269144000000":21314,
				"1268107200000":19942,
				"1267070400000":18207,
				"1266033600000":16249,
				"1264996800000":13268,
				"1263960000000":12500,
				"1262923200000":10638,
				"1261886400000":7274,
				"1260849600000":5620,
				"1259812800000":4004,
				"1258776000000":1474,
				"1257739200000":247
			},
			"createdTime":1255665600000
		}

		var graph_data = [];

		var viewTimes = Object.keys(video.views);
		var numViews = viewTimes.length;

		while(numViews--){
			var row = [viewTimes[numViews], video.views[viewTimes[numViews]]];
			graph_data.push(row); 
		}

		res.json(graph_data);
	});

	app.get("/:contentid/value", function(req, res){
		res.json({id:req.params.contentid, type:"value"});
	});
}