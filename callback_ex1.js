var fs = require('fs');

function callback(err, results) {
	if(err) return handleError(err);
	console.log('First attempt');
	console.log('File contents:', results);
}

fs.readFile('/etc/passwd', callback);

fs.readFile('/etc/passwd', function(err, results){
	if(err) return handleError(err);
	console.log('Second attempt');
	console.log('File contents', results);
});