var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

var rssWarn = (50 * 1024 * 1024),
	heapWarn = (50 * 1024 * 1024);

var workers = {};

if(cluster.isMaster){
	for(var i = 0 ; i < numCPUs; i++) {
		createWorker();
	}

	setInterval(function() {
		var time = new Date().getTime();
		//console.log(workers);
		for(pid in workers) {

			// console.log(workers.hasOwnProperty(pid));
			// console.log(workers[pid].lastCb + 5000 < time);
			if(workers.hasOwnProperty(pid) && workers[pid].lastCb + 5000 < time) {
				console.log('Long running worker ' + pid + ' killed' );
				workers[pid].worker.process.kill();
				delete workers[pid];
				createWorker();
			}
		}
			
	}, 1000);
} else {
	http.Server(function(req, res) {
		if(Math.floor(Math.random() * 200) ===4) {
			console.log('Stopped ' + process.pid + ' from ever running')
			while(true) { continue }
		}
		res.writeHead(200);
		res.end('hello world from ' + process.pid + '\n');
	}).listen(8000);

	setInterval(function(report) {
		process.send({cmd: "reportMem", memory: process.memoryUsage(), process: process.pid});
	}, 1000);
}

function createWorker() {
	var worker = cluster.fork();
	//console.log(worker);
	console.log('Created worker: ' + worker.process.pid);

	workers[worker.process.pid] = { worker: worker, pid:worker.process.pid, lastCb: new Date().getTime()-1000};
	
	worker.on('message', function(m) {
		if(m.cmd === 'reportMem') {
			//console.log(m.process);
			workers[m.process].lastCb = new Date().getTime();
			if(m.memory.rss > rssWarn) {
				console.log('Worker ' + m.process + ' using too much memory');
			}
		}
	})
}