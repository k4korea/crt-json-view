var net = require('net');
var sPort = 3222
var clients = [];
var socket_count = 0;
var parent_server;

var server = net.createServer(function(socket) {
//	socket.write('Echo server\r\n');

    //socket.write(" Welcome to server ");

    clients.push(socket);
    socket_count++;
    socket.pipe(socket);


    console.log("connection count: %d", socket_count);
//------------------- ###  socket ###  ------------

    socket.on('error', function(err){
        console.log("server error:", err);
    })

    socket.on('data', function(data){
        var sender = this;
        
        clients.forEach(function(client) {
        if (client !== sender) 
            client.write(data);
            console.log( "client->server", data)
            console.log( clients.length);
        });
    })


    socket.on('drain',function(){
        console.log('write buffer is empty now .. u can resume the writable stream');
        socket.resume();
    });

    socket.on('timeout',function(){
        console.log('Socket timed out !');
        socket.end('Timed out!');
        // can call socket.destroy() here too.
      });
      
    socket.on('end',function(data){
        console.log('Socket ended from other end!');
        console.log('End data : ' + data);

        
    });

    
    socket.on('close', function(socket) {
        clients.splice(clients.indexOf(socket), 1);
        //clients.push(socket);
        socket_count--;
        console.log( "client socket :", socket_count);
        console.log(" clients length: ", clients.length);
    });

      
//------------------- ###  socket ###  ------------

});
server.on('error',function(error){
    console.log('Error: ' + error);
});

server.on('connection',function(socket)
{
    socket.setEncoding('utf8');
});


server.listen(sPort, '127.0.0.1',function(){
    console.log("listen socket... Port: ",sPort );
});


parent_server = server;



