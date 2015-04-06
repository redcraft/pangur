var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));
app.use(['/about', '/portfolio/inforbix-web', '/portfolio/inforbix-ipad', '/portfolio/a360', '/portfolio', '/contact', '/'],  express.static(__dirname + '/'));



app.listen(3000);