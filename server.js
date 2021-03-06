var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var email = require('emailjs');

app.use(['/about', '/contact', '/portfolio/inforbix-web', '/portfolio/inforbix-ipad', '/portfolio/a360', '/portfolio', '/'],  express.static(__dirname + '/public'));
app.use("/bower_components", express.static(__dirname + '/bower_components'));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

var server  = email.server.connect({
    user:    process.env.PANGUR_EMAIL,
    password:process.env.PANGUR_PASSWORD,
    host:    "smtp.gmail.com",
    ssl:     true

});

app.post('/api/messages', function(req, res) {
	console.log(req.body);
    var author = req.body.name+ " <" + req.body.email + ">";
    server.send({
        text:    req.body.message,
        from:    author,
        "reply-to":    author,
        to:      "Maxim Gurkin <redmax3d@gmail.com>",
        subject: "New message from portfolio"
    }, function(err) { if(err) console.log(err); });
    res.send("{}");
});

app.listen(3000);