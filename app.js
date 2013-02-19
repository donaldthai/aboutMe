var http = require('http');
var fs = require('fs');

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

}).listen(process.env.VMC_APP_PORT || 1337, null);
