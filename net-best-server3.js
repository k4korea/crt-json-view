var net = require('net');

var iconv = require('iconv-lite')


var STRUCTCPP = require("cpp-struct-js");
// creates the server
//var Buffer = require('buffer')
var server = net.createServer();
var clients = [];
var socket_count = 0;


var chara = new Buffer(4);
var intb = new Buffer(4);
var charc = new Buffer(16);

//var charTotal =new Buffer('','utf8' )
//charTotal.allocUnsafe(25);


//emitted when server closes ...not emitted until all connections closes.
server.on('close',function(){
  console.log('Server closed !');
});

// emits when any error occurs -> calls closed event immediately after this.
server.on('error',function(error){
    console.log('Error: ' + error);
  });
  
  //emits when server is bound with server.listen
server.on('listening',function(){
    console.log('Server is listening!');
});
  
server.maxConnections = 10;
 //static port allocation
server.listen(3222);

// emitted when new client connects
server.on('connection',function(socket)
{

//this property shows the number of characters currently buffered to be written.
// (Number of characters is approximately equal to the number of bytes to be written,
// but the buffer may contain strings, and the strings are lazily encoded, 
// so the exact number of bytes is not known.)
//Users who experience large or growing bufferSize should attempt 
// to "throttle" the data flows in their program with pause() and resume().

    console.log('Buffer size : ' + socket.bufferSize);

    console.log('---------server details -----------------');

    var address = server.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Server is listening at port' + port);
    console.log('Server ip :' + ipaddr);
    console.log('Server is IP4/IP6 : ' + family);

    var lport = socket.localPort;
    var laddr = socket.localAddress;
    console.log('Server is listening at LOCAL port' + lport);
    console.log('Server LOCAL ip :' + laddr);

    console.log('------------remote client info --------------');

    var rport = socket.remotePort;
    var raddr = socket.remoteAddress;
    var rfamily = socket.remoteFamily;

    console.log('REMOTE Socket is listening at port' + rport);
    console.log('REMOTE Socket ip :' + raddr);
    console.log('REMOTE Socket is IP4/IP6 : ' + rfamily);

    console.log('--------------------------------------------')
    //var no_of_connections =  server.getConnections(); // sychronous version
    server.getConnections(function(error,count){
        console.log('Number of concurrent connections to the server : ' + count);
    });

    clients.push(socket);
    socket_count++;
    socket.setEncoding('utf8');
    socket.setTimeout(800000,function(){
    // called after timeout -> same as socket.on('timeout')
    // it just tells that soket timed out => its ur job to end or destroy the socket.
    // socket.end() vs socket.destroy() => end allows us to send final data and allows some i/o activity to finish before destroying the socket
    // whereas destroy kills the socket immediately irrespective of whether any i/o operation is goin on or not...force destry takes place
        console.log('Socket timed out');
    });


    socket.on('data',function(data){
        var bread = socket.bytesRead;
        var bwrite = socket.bytesWritten;
        
        console.log('Bytes read : ' + bread);
        console.log('Bytes written : ' + bwrite);
        console.log('Data sent to server : ' + data);

        

      var utf8_str = iconv.decode(Buffer.from(data), "utf8");
       charTotal = Buffer.from(data, 'utf8');     //13 'bc' ''bc fghi''
       bynari = Buffer.from(data,4)
       console.log("utf8_str", utf8_str);
        console.log("char_total", charTotal);
        console.log("bynari :", bynari)
      
        console.log("--------  utf8_str-----");
        inta = utf8_str.slice(0, 4);
        charb = utf8_str.slice(4, 8);
        charc = utf8_str.slice(8, 118);
        
        charb_1 = Buffer.from(data,4,4).readInt8();
        
        charb_3 = Buffer.from(data,4,4).readUInt16LE();
        charb_4 = Buffer.from(data,4,4).readUInt16BE();
        charb_5 = Buffer.from(data,4,4).readUInt16LE();
        charb_6 = Buffer.from(data,4,4).readUInt32LE();
        charb_7 = Buffer.from(data,4,4).readUInt32BE();

        
        charb_9 = Buffer.from(data,4,4).writeInt16LE();
        charb_10 = Buffer.from(data,4,4).writeInt16BE();
        charb_11 = Buffer.from(data,4,4).writeInt16LE();
        charb_12 = Buffer.from(data,4,4).writeInt32LE();
        charb_13 = Buffer.from(data,4,4).writeInt32BE();
        
        
        /*
        console.log('inta:',  inta.toString('utf-8'));
        console.log('inta64:',  inta.toString('base64'));
        console.log( "type charb", typeof(charb));
        console.log( "type charb_1", charb_1);
        console.log( "type charb_3", charb_3);
        console.log( "type charb_4", charb_4);
        console.log( "type charb_5", charb_5);
        console.log( "type charb_6", charb_6);
        console.log( "type charb_7", charb_7);
        
        console.log( "type charb_9", charb_9);
        console.log( "type charb_10", charb_10);
        console.log( "type charb_11", charb_11);
        console.log( "type charb_12", charb_12);
        console.log( "type charb_13", charb_13);
*/
        console.log('charb:',   charb.toString('utf-8'));
        console.log('charc:',  charc.toString('utf-8'));

        console.log("--------  charTotal-----");
        inta = charTotal.slice(0, 4);
        charb = charTotal.slice(4, 8);
        charc = charTotal.slice(8, 118);
        console.log('inta:',  inta.toString('utf8'));
        
        console.log('charb:',   charb.toString('utf-8'));
        console.log('charc:',  charc.toString('utf-8'));

        console.log("--------  bynari-----");
        inta = bynari.slice(0, 4);
        charb = bynari.slice(4, 8);
        charc = bynari.slice(8, 118);
        //inta = bynari.slice(0, 49);
        //charb = bynari.slice(49, 53);
        //charc = bynari.slice(53, 154);
        console.log('inta:',    inta.toString('utf8'));
        console.log('charb:',   binaryToDecimal(charb));
        //console.log('charb:',   charb.toString(16));
        console.log('charc:',  charc.toString('utf8'));
      

        function binaryToDecimal(string) {
            let decimal = +0;
            let bits = +1;
            for(let i = 0; i < string.length; i++) {
                let currNum = +(string[string.length - i - 1]);
                if(currNum === 1) {
                    decimal += bits;
                }
                bits *= 2;
            }
            console.log(decimal);
        }


      try{
        /*
        a1 = charTotal.slice(0, 4);

        a2 = charTotal.slice(4, 8);
        a3 = charTotal.slice(8, 12);
        a4 = charTotal.slice(12, 17);
        a5 = charTotal.slice(17, 23);
 
        console.log('1 :', a1.readUInt8() );
        console.log('2 :', a2.readUInt8() );
        console.log('3 :', a3.toString('utf-8'));
        console.log('4 :', a4.toString('utf-8') );       
        console.log('5 :', a5.toString('utf-8'));
        //console.log('4 :',  charc.toString('utf-8'));
        */
       //var utf8_str = iconv.decode(Buffer.from(data), "utf8");
       //charTotal = Buffer.from(data, 'utf8');     //13 'bc' ''bc fghi''

       /*
       a1 = utf8_str.slice(0,4);
       a2 = charTotal.slice(0,4);
       //a1.replace('ef bf bd', '12345678');
       //a2 = charTotal.slice(4, 8);

       console.log('a1 :', Buffer(data,1).readUIntBE() );
       console.log('a2 :', Buffer(data,1).readUIntLE() );
       console.log('a1 :', Buffer(data,1).readInt32BE() );
       console.log('a2 :', Buffer(data,1).readInt32LE() );
       console.log('a2 :', Buffer(data,1).readUInt8() );
       console.log('a2 :', Buffer(data,1).readInt8() );


       console.log("a1:" ,a1);
       console.log("a2:" ,a2);
       */
      }
      catch(err){
          console.log("err:", err);
      }
       

        
/*
chara = data.slice(0, 4);
intb = data.slice(4, 8);
charc = data.slice(8, 24);
console.log('char a :', chara.toString('utf-8'));
console.log('int b :', intb.readUInt8());
console.log('char c :', charc.toString('utf-8'));
*/
/*

       console.log("data: ", data );
       var inta = data.slice(0,4);
       var chara = data.slice(4,9);
       var charb = data.slice(9,16);
       console.log( "inta:", inta)
       console.log( "type: ", typeof(inta) );
        */
/*
       var receive = Buffer(16,data);
       a1 = receive.slice(0,4); //.readUInt8();
       a2 = receive.slice(4,9);
       a3 = receive.slice(9,16);

       //console.log(" receive a1, a2, a3  : %d, %s, %s  ", a1,a2, a3);
        console.log("a1 : " + inta)
        console.log("a2 : " + chara)
        console.log("a3 : " + charb)
/*  
try {
    console.log( "int:",  inta.readUInt8(0) );
    
} catch (error) {
    console.log( "error: ", error);
} 
                                
       //console.log( "int:",  inta.readUInt8(0) );
       console.log( "chara:",chara.toString('utf-8'));
       console.log( "charb:", charb.toString('utf-8'));

       // 참조 https://blog.naver.com/dimigozzang/220340027750  c++ nodejs
       // 참조 
       */ 
       var sender = this;
        clients.forEach(function(client) {
            if (client !== sender) 
                client.write(data);
        });



    });

    socket.on('drain',function(){
        console.log('write buffer is empty now .. u can resume the writable stream');
        socket.resume();
    });

    socket.on('error',function(error){
        console.log('Error : ' + error);
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

    socket.on('close',function(error){
        var bread = socket.bytesRead;
        var bwrite = socket.bytesWritten;
        console.log('Bytes read : ' + bread);
        console.log('Bytes written : ' + bwrite);
        console.log('Socket closed!');
        if(error){
            console.log('Socket was closed coz of transmission error');
            server.getConnections(function(error,count){
                console.log('Number of concurrent connections to the server : ' + count);
            });

            clients.splice(clients.indexOf(socket), 1);
            socket_count--;
            console.log("socket count: ", socket_count);
        }
    }); 

    /*  삭제하는 루틴 집어 넣어야 한다.  db 조회해서....
    setTimeout(function(){
    var isdestroyed = socket.destroyed;
    console.log('Socket destroyed:' + isdestroyed);
    socket.destroy();
    },11000);
    */

});



/*
// for dyanmic port allocation
server.listen(function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);
});
*/


var islistening = server.listening;

if(islistening){
  console.log('Server is listening');
}else{
  console.log('Server is not listening');
}
/*
setTimeout(function(){
  server.close();
},5000000);
*/
