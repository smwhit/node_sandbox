var fs = require('fs');

var readStream = fs.createReadStream('/var/log/system.log');

readStream.on('data', function(data){
	console.log('got some data:', data);
});

readStream.on('end', function(){
	console.log('ended');
});

readStream.setEncoding('base64');