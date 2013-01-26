var fs = require('fs');
var writeStream = fs.createWriteStream('/tmp/write.txt');

var interval = setInterval(function() {
	var flushed = writeStream.write((new Date()).toString() + '\n');
	console.log('flushed:', flushed);
}, 100);

writeStream.on('drain', function() {
	console.log('drained');
});

setTimeout(function() {
	clearInterval(interval);
	writeStream.end();
}, 5000);