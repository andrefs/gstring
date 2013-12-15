var express = require('express'),
    exphbs  = require('express3-handlebars'),

    app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/video', function (req,res){
	var videoid;
	if(req.query.videoid.match(/v=(\w+)/)) 	videoid = RegExp.$1;
	else 									videoid = req.query.videoid;
	res.render('video', {
		videoid:      videoid,
		soundtrack:   req.query.soundtrack,
		playbackrate: req.query.playbackrate,
		mute:         req.query.mute
	});
});

app.listen(3000);
