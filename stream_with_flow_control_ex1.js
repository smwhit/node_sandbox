var fs = require('fs');

var readStream = fs.createReadStream('/var/log/system.log');

//readStream.pause();

readStream.on('data', function(data){
	console.log('got some data:', data);
	readStream.pause();
	setTimeout(function() {
		readStream.resume();
	}, 1000);
});

readStream.on('end', function(){
	console.log('ended');
});

setTimeout(function() {
	readStream.resume();
}, 1000);