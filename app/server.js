var express = require("express");
var app = express();
var server;

exports.listen = function() {
	app.use(express.static(__dirname + '/html'));
	server = app.listen(8080);
}

exports.close = function(){
	server.close();
}