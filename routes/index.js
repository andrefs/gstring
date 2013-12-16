
exports.index = function (req, res) {
    res.render('home');
};

exports.video = function (req,res){
	var videoid;
	if(req.query.videoid.match(/v=(\w+)/)) 	videoid = RegExp.$1;
	else 									videoid = req.query.videoid;
	res.render('video', {
		videoid:      videoid,
		soundtrack:   req.query.soundtrack,
		playbackrate: req.query.playbackrate,
		mute:         req.query.mute
	});
};

