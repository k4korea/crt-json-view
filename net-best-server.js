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

        
     const T2O = 16; //대강 String 받을 크기


        /*
    var stTest1 = new STRUCTCPP("stTest1", [
                "test1Str",  STRUCTCPP.uint8(T2O), //String
                "test2uint", STRUCTCPP.uint8(2),    //uint16
            ]); 


    var stTest2 = new STRUCTCPP("stTest2", [
                "testAuint",  STRUCTCPP.uint8(2),     //uint16
                "testBstr",    STRUCTCPP.uint8(T2O), //String
                "testCuint",  STRUCTCPP.uint8(2),     //uint16
                "testD", STRUCTCPP.type(stTest1 , 3) //stTest1[3]
            ]); 

    var bufTestRevc = data;

    let decData = stTest2.decode (bufTestRevc, 0, {endian : "LE"}); // "bufTestRevc"위의 장비 패킷을 디코딩합니다.
    console.log("decData:",decData );

    let stTest2_testAuint_buf = new Buffer (decData.testAuint);
    console.log("stTest2_testAuint_buf:",stTest2_testAuint_buf );
    let stTest2_testAuint = stTest2_testAuint_buf.readUIntLE (0, stTest2_testAuint_buf.length); // 값 : 52
    console.log("stTest2_testAuint:",stTest2_testAuint );


    let stTest2_testBstr = new Buffer (decData.testBstr) .toString (); // 값 : "test 가나"
    console.log("stTest2_testBstr:",stTest2_testBstr );
    let stTest2_testBstr_buf = new Buffer (decData.testBstr);
    console.log("stTest2_testBstr_buf:",stTest2_testBstr_buf );
    stTest2_testBstr = stTest2_testBstr_buf.readUIntLE (0, stTest2_testBstr_buf.length); // 값 : 23
    console.log("stTest2_testBstr:",stTest2_testBstr );


    let testD_0 = decData.testD [0];
    let testD_1 = decData.testD [1];
    let testD_2 = decData.testD [2];



    // testD_2 만 해독 해보겠다.
    let testD_2_test1Str = new Buffer (testD_2.test1Str) .toString (); // 값 : "test 가나"
    let testD_2_test2uint_buf = new Buffer (testD_2.test2uint);
    let testD_2_test2uint = testD_2_test2uint_buf.readUIntLE (0, testD_2_test2uint_buf.length); // 값 : 52


*/
      
            
            
            
            
            
            /*
let dat16_t1 = new Uint16Array([52]);
let dat8_t1  = new Uint8Array(dat16_t1.buffer);
let datStr_t2     = "test가나";
let datStrbuf_t2 = Buffer(datStr_t2);


let dat16_t3 = new Uint16Array([23]);
let dat8_t3  = new Uint8Array(dat16_t2.buffer);

let datStr_p1     = "test다라";
let datStrbuf_p1 = Buffer(datStr_p2);


let dat16_p2= new Uint16Array([123]);
let dat8_p2= new Uint8Array(dat16_p2.buffer);


var bufTest = new Buffer(stTest2.size());
stTest2.encode(bufTest, 0, {
    testAuint: dat8_t1,      //값:52
    testBstr: datStrbuf_t2,  //값:"test가나"
    testCuint: dat8_t3,      //값:23
    testD:[ 
        {test1Str: datStrbuf_p1},   //배열 testD[0]->test1Str: "test다라"
        {test2uint: dat8_p2},       //배열 testD[1]->test2uint: 123
        {test1Str: datStrbuf_t2, test2uint: dat8_t1},     //배열 testD[2]->test1Str: "test가나", test2uint: 52
    ]

},{endian: "LE"});

clientSocket.write(bufTest); //위의 bufTest 버퍼를 보낸다.



let decData = stTest2.decode(bufTestRevc, 0, {endian:"LE"});  //"bufTestRevc" 위의 가져온 패킷을 decode 한다.
let stTest2_testAuint_buf = new Buffer(decData.testAuint);
let stTest2_testAuint = stTest2_testAuint_buf.readUIntLE(0, stTest2_testAuint_buf.length); //값: 52
let stTest2_testBstr = new Buffer(decData.testBstr).toString(); //값:"test가나     "
let stTest2_testBstr_buf = new Buffer(decData.testBstr);
let stTest2_testBstr = stTest2_testBstr_buf.readUIntLE(0, stTest2_testBstr_buf.length); //값: 23

let testD_0 = decData.testD[0];
let testD_1 = decData.testD[1];
let testD_2 = decData.testD[2];

//testD_2 만 decode 해보겠다.

let testD_2_test1Str = new Buffer(testD_2.test1Str).toString();  //값:"test가나     "
let testD_2_test2uint_buf = new Buffer(testD_2.test2uint);
let testD_2_test2uint = testD_2_test2uint_buf.readUIntLE(0, testD_2_test2uint_buf.length); //값: 52
*/







        
    //tranU2A = new Iconv('UTF-8', 'EUC-KR//TRANSLIT//IGNORE');
    //tranA2U = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');

    //tranA2U.


       // console.log('Data object : ' , data);

        //echo data
        /*
        var is_kernel_buffer_full = socket.write('Data ::' + data);
        if(is_kernel_buffer_full){
            console.log('Data was flushed successfully from kernel buffer i.e written successfully!');
        }else{
            socket.pause();
        }
        */
      // charTotal = Buffer.from(data, 'utf16LE');  //13 '  ' bc fghi
        

      var utf8_str = iconv.decode(Buffer.from(data), "utf8");
       charTotal = Buffer.from(data, 'utf8');     //13 'bc' ''bc fghi''
       bynari = Buffer.from(data,4)
       console.log("utf8_str", utf8_str);
             
       //charTotal = data;
        console.log("char_total", charTotal);
        console.log("bynari :", bynari)
      /*
        inta = charTotal.slice(0, 4);
        charb = charTotal.slice(4, 8);
        charc = charTotal.slice(8, 24);
        console.log('inta:', inta.readUInt8() );
        console.log('charb:',  charb.toString('utf-8'));
        console.log('charc:',  charc.toString('utf-8'));
      */


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
