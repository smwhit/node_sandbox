var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

var rssWarn = (24 * 1024 * 1024),
	heapWarn = (20 * 1024 * 1024);

if(cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
		var worker = cluster.fork();
		worker.on('message', function(m){
			if(m.memory) {
				if(m.memory.rss > rssWarn){
					console.log('Worker ' + m.process + ' using too much memory');
				}
			}
		})	
	};
	
} else {
	http.Server(function(req, res){
		res.writeHead(200);
		res.end('hello world');
	}).listen(8000);

	setInterval(function report() {
		process.send({ memory: process.memoryUsage() , process: process.pid});
	}, 1000);
}