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

/**
 * Adding in MongoDB services from appfog
 */
if (process.env.VCAP_SERVICES) {
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb-1.8'][0]['credentials'];
}
else {
    var mongo = {
        "hostname": "localhost",
        "port": 27017,
        "username": "",
        "password": "",
        "name": "",
        "db": "db"
    };
}
var generate_mongo_url = function(obj) {
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if (obj.username && obj.password) {
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else {
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
};
var mongourl = generate_mongo_url(mongo);
//end of MongoDB services



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
