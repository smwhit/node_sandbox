var dns = require('dns');

dns.lookup(process.argv[2], function(err, address){
	//console.log(process.argv[2]);
	if(err) return handleError(err);
	console.log('%s resolved to %s', process.argv[2], address);
});

handleError = function(err){
	console.log(err.errno);
};