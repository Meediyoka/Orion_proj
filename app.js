var express = require('express');
var app = express();
var pg = require('pg');
app.use(express.static(__dirname + '/dist'));
app.use(express.static('js'));



/*var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.end();*/

app.get('/',function (req, res){
	res.sendFile(__dirname + '/dist/index.html');
});

app.listen(8081, function(){
	console.log('listening on port 8081!');
});