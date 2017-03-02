/*
 * Module dependencies
 */
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var path = require('path');
var http = require('http');
var fs = require('fs');
var crypto = require('crypto');

//creating the app
var app = express();

//using the modules stylus and nib
function compile(str, path) {
    return stylus(str).set('filename', path).use(nib());
}
//configuring app pointing to the views
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {
        layout: false
    });
    app.use(express.logger('dev'));
    app.use(stylus.middleware({
        src: __dirname + '',
        compile: compile
    }));

    app.use(express.static(__dirname));
    //Parser for POST requests, use req.body
    app.use(express.bodyParser());
});

//For gravatar images
//hash md5
var md5sum = crypto.createHash('md5');
var pictureHash = md5sum.update(process.env.EMAIL_ADDRESS).digest('hex');

app.set('port', (process.env.PORT || 5000));

//server responses, aka Routes
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Home',
        picHash: pictureHash
    });
    //res.end(__dirname)
});

app.post('/message', function(req, res, next){
    console.log(req.body);
    //res.setHeader("Content-Type", "application/json");
    //res.writeHead({"Content-Type" : "application/json"});
    //res.contentType('application/json');
    //res.contentType('text/plain');
    //res.send(JSON.stringify(req.body.user));
    //res.send('_testcb(\'{"message": "Hello world!"}\')');
    //res.end('<script>alert('+JSON.stringify(req.body.user)+')</script>');
    //res.send();
    res.set({'Content-Type': 'application/json'});
    //the json object turned back into serialized form so have to
    //stringify it again, then send it back
    res.send('messageCB(\''+JSON.stringify(req.body)+'\')');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


/* old way
http.createServer(function (req, res) {

	fs.readFile('./style.css', function (err, css) {
		if (err)
		{
			throw err;
		}

		res.writeHead(200, {"Content-Type": "text/html"});
		res.write('<style>');
		res.write(css);
		res.write('</style>');
		//res.end();
	});

	fs.readFile('./index.html', function (err, html) {
		if (err)
		{
			throw err;
		}

		//res.writeHead(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	});

}).listen(process.env.VMC_APP_PORT || 1337, null);*/
