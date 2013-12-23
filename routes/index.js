
exports.index = function (req, res) {
    res.render('home');
};

exports.video = function (req,res){
	var videoid;
	if(req.query.videoid.match(/v=([-\w]+)/)) 	videoid = RegExp.$1;
	else 									videoid = req.query.videoid;

	var full_url  = req.protocol + "://" + req.get('host') + req.url;
	get_short_url(full_url, function(short_url){
		console.log(short_url);
		res.render('video', {
			short_url    :  short_url,
			videoid      :  videoid,
			soundtrack   :  req.query.soundtrack,
			playbackrate :  req.query.playbackrate,
			mute         :  req.query.mute
		});
	});

};


function get_short_url(full_url, callback){
	var https = require('https');
	var options = {
		method  :  'POST',
		host    :  'www.googleapis.com',
		path    :  '/urlshortener/v1/url',
		headers :  {'content-type':'application/json'}
	};
	var req = https.request(options, function(response){
		var str = '';
		response.on('data', function (chunk) {
		  str += chunk;
		});
		
		response.on('end', function () {
			var json = JSON.parse(str);
		  callback(json.id);
		});
	});
	req.write('{"longUrl": "'+full_url+'"}');
	req.end();
};
