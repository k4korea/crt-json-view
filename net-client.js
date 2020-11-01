
var net = require('net');

var client = new net.Socket();
//client.setEncoding('utf8');

client.connect(3222, '127.0.0.1', function() {
	console.log('Connected server');
	client.write('Hello, server! Love, Client.');
});


process.stdin.resume();

process.stdin.on('data', function(data){
  client.write(data);
});

client.on('data', function(data){
  console.log('client->server ' + data);
});



client.on('close', function() {
	console.log('Connection closed');
});


