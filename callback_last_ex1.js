var dns = require('dns');

dns.lookup('google.com', function(err, ipAddress){
	if(err) return handleError(err);
	console.log('google.com resolved t %s', ipAddress);
});