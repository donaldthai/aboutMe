/*
 * Module dependencies
 */
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var path = require('path');
var http = require('http');
var fs = require('fs');

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path).use(nib());
}

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
});


app.get('/', function(req, res) {
    res.render('index', {
        title: 'Home'
    });
    //res.end(__dirname)
}).listen(process.env.VMC_APP_PORT || 1337, null);

/*
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
