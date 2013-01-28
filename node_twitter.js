var express = require('express');
var app = express();
app.set('json spaces',0);

var tweets = [];

app.get('/', function(req, res){
	//res.send('Welcome to Node Twitter');
	var title = 'Chirpie', header = 'Welcome to Chirpie';

	res.render('index.ejs', {
		locals: {
			'title': title,
			'header': header,
			'tweets': tweets,
			//stylesheets: ['/public/style.css']
		}
	})
});

app.post('/send', express.bodyParser(), function(req, res){
	//console.log(req.body);
	console.log(req.body.tweet);
	if(req.body && req.body.tweet) {
		tweets.push(req.body.tweet);

		if(acceptsHtml(req.headers['accept'])){
			res.redirect('/', 302);
		}
		else {
			res.send({status:"ok", message:"tweet received"});
		}
	}
	else{
		//no tweet?
		res.send({status:"nok", message:"no tweet received"});
	}
});

app.get('/tweets', function(req, res){
	res.send(tweets);
});

function acceptsHtml(header) {
	var accepts = header.split(',');
	for (var i = 0; i < accepts.length; i++) {
		if(accepts[i]==='text/html') { 
			return true;
		}
	};
	return false;
}

app.listen(8000);