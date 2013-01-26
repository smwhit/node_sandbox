var net = require('net');
var format = require('util').format;

var server = net.createServer();

server.on('connection', function(conn){
	var printPrefix = '[' + conn.remoteAddress + ':' + conn.remotePort + '] ';
	function print() {
		var formatted = format.apply({}, arguments);
		console.log(printPrefix + formatted);
	};

	print('connected');

	conn.on('timeout', function(){
		print('timed out');
	});

	conn.on('data', function(data){
		print('got some data:', data);
		//conn.setTimeout(1);
		//throw new Error("doh!");
	});

	conn.on('end', function(){
		print('ended');
	});

	conn.once('close', function(){
		print('closed');
	});

	conn.on('error', function(err){
		print('erorr:', err);
	});

	conn.setEncoding('utf-8');
});

server.on('error', console.error);

process.on('uncaughtException', function(error){
	console.error('unhandled ex');
	console.error(error);
	process.exit();
});
server.listen(8080);