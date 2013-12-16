var express = require('express'),
    exphbs  = require('express3-handlebars'),
	routes  = require('./routes'),
	path    = require('path'),
	http    = require('http'),
    app     = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(process.env.COOKIE_SECRET || 'RUJtVAafttBDqoxMiEgiiZQnsmC'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/',      routes.index);
app.get('/video', routes.video);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' +
	app.get('port'));
});


