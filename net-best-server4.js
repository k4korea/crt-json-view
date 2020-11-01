var net = require('net');

var iconv = require('iconv-lite')

var objType = require("./Type");
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


        
        // D:\develop\mfc-test\3조챗서버\TestChat(after)
        // 테스트 OnButton2
        console.log( "data:", data);
        console.log("data type:", typeof(data) );

        utf_data = Buffer.from(data, 'utf-8'); 
    /*
        var a11 =utf_data.slice(0,15);      
        var a21 =utf_data.slice(15,30);
        var a31 =utf_data.slice(30,35);
        var a31 =utf_data.slice(30,34);
        var a31 =utf_data.slice(30,34);
        var a41 =utf_data.slice(34,50);


        var a31_1 =utf_data.readInt16BE(30);            
        var a31_2 =utf_data.readInt16LE(30);   
        var a31_3 =utf_data.readInt16BE(34);  
        var a31_4 =utf_data.readUIntLE(30,4);
        var a31_5 =utf_data.readUInt8(30,2);  
        var a31_6 =utf_data.readUInt8(34,2);          

       
        console.log("a11:", a11.toString('utf-8'));        
        console.log("a21:", a21.toString('utf-8'));        
        console.log("a31:", a31);            
        console.log("a31:", a31.toString('utf-8'));
        console.log("a31:", a31.toString('ascii'));                    
        console.log("a41:", a41.toString('utf-8'));
        console.log("a31_1:", a31_1);            
        console.log("a31_2:", a31_2);  
        console.log("a31_3:", a31_3);  
        console.log("a31_4:", a31_4);  
        console.log("a31_5:", a31_5);  

        
         

        console.log("a11-ascii:", a11);        
        console.log("a21-ascii:", a21);        
        console.log("a31-ascii:", a31);        
        console.log("a41-ascii:", a41);        

        */
        var b11 =utf_data.slice(0,10);      
        var b21 =utf_data.slice(10,14);
        var b31 =utf_data.slice(14,24);
        var b41 =utf_data.slice(24,35);
        console.log("data:", typeof(data));
        //var a4 =charTotal.readUInt8(25,4);

        console.log("b11:", b11.toString('utf-8'));        
        console.log("b21:", b21.toString('utf-8'));        
        console.log("b31:", b31.toString('utf-8'));            
        console.log("b41:", b41.toString('utf-8'));            

        console.log("a11-ascii:", b11);        
        console.log("a21-ascii:", b21);        
        console.log("a31-ascii:", b31);        
        console.log("a41-ascii:", b41);        

        var offset = 0;
        //self.header_data.copy(self.header, 0, 2);
        //offset += 2;

        var utf8_str = iconv.decode(Buffer.from(data), "utf8");
        charTotal = Buffer.from(data, 'utf8');    
         //13 'bc' ''bc fghi''
        bynari = Buffer.from(data,134)
        
        this.copy_data = new Buffer.alloc(0);
        //this.copy_data = Buffer.concat(data, data.length);
        console.log("bynari", bynari)
        
       // offset = 10;
        var a1 =charTotal.slice(0,15);      
        var a2 =charTotal.slice(15,30);
        var a3 =charTotal.slice(30,34);
        var a4 =charTotal.slice(34,49);
        var a4 =charTotal.slice(49,59);


        console.log("charTotal:", typeof(charTotal));
        //var a4 =charTotal.readUInt8(25,4);

/*
        var a_1 =charTotal.slice(0,14);      
        var a_2 =charTotal.slice(14,23);
        var a_3 =charTotal.slice(23,37);

        var b = a_1.toString('utf-8');
        console.log("b type: ", typeof(b));
        console.log("b에대입", a_1.toString('utf-8') );
        b.replace("�", "");
        console.log("b에대입�제거 ", b );


        console.log("a1_-ascii:", a_1.toString('utf-8'));        
        console.log("a2_-ascii:", a_2.toString('utf-8'));        
        console.log("a3_-ascii:", a_3.toString('utf-8'));        
*/
       
        console.log("a1:", a1.toString('utf-8'));        
        console.log("a2:", a2.toString('utf-8'));        
        console.log("a3:", a3.toString('utf-8'));    
        console.log("a4:", a3.toString('utf-8'));   

        

        console.log("a1-ascii:", a1);        
        console.log("a2-ascii:", a2);        
        console.log("a3-ascii:", a3);        

        var iconv_encode_utf_8 = iconv.encode(data, 'utf-8');
        var iconv_decode_utf_8 = iconv.decode(data, 'utf-8');

        var iconv_encode_euc = iconv.encode(data, 'euc-kr');
        var iconv_decode_euc = iconv.decode(data, 'euc-kr');

        var iconv_encode_cp949 = iconv.encode(data, 'CP949');
        var iconv_decode_cp949 = iconv.decode(data, 'CP949');

        //var iconv_encode_ISO = iconv.encode(data, 'ISO-2022-KR');
        //var iconv_decode_ISO = iconv.decode(data, 'ISO-2022-KR');



        console.log( 'iconv_encode_utf_8: ',iconv_encode_utf_8 );
        console.log( 'iconv_decode_utf_8: ',iconv_decode_utf_8 );
        
        console.log( 'iconv_encode_euc: ',iconv_encode_euc );
        console.log( 'iconv_decode_euc: ',iconv_decode_euc );

        console.log( 'iconv_encode_cp949: ',iconv_encode_cp949 );
        console.log( 'iconv_decode_cp949: ',iconv_decode_cp949 );

       // console.log( 'iconv_encode_ISO: ',iconv_encode_ISO );
        //console.log( 'iconv_decode_ISO: ',iconv_decode_ISO );

         
        //console.log("a2:", a2.toString('utf-8'));
        //console.log("a2: Number", parseInt(a2.toString('utf-8')));
        

        var a11 =bynari.slice(0,10);      
        var a12 =bynari.slice(10,15);
        var a13 =bynari.slice(15,28);   //잘나옴 형석탱이
        var a14 =bynari.readIntLE(28,4);

        //var a13 =bynari.slice(15,28);
        //var a14 =bynari.readIntLE(28,4);
       
        console.log("a11:", a11.toString('utf-8'));        
        console.log("a12:", a12.toString('utf-8'));        
        console.log("a13:", a13.toString('utf-8'));        
        //console.log("a14:", a14.toString('utf-8'));        
        console.log("a14:", a14);        


       
              //objType.VARTYPE.getValue()

    

        
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
