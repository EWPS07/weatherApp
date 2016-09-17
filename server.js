var express = require('express');
var bodyparser = require('body-parser');
var src = express();
var port = process.env.PORT || 8080;

src.use(bodyparser.json());
src.use(bodyparser.urlencoded({
  extended: true
}));
src.use(express.static(__dirname + '/src/'));


src.get('/', function(req, res) {
  res.sendFile('index.html');
});


src.listen(port, function() {
  console.log('server started on port' + port);
});