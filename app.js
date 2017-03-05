var http = require('http');
var express = require('express'),
	jsdom = require('jsdom'),
	request = require('request'),
	url = require('url'),
	app = module.exports = express.createServer();


var server = http.createServer(function(request, response){
  response.writeHead(200,{
    'Content-type' : 'text/plain'
  });

  response.end("Hello World");
})

server.listen(3000);
console.log("Listening to port 3000");

