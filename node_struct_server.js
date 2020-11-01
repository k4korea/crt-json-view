var net=require('net');
var client = new net.Socket();



//var tranU2A = new Iconv('UTF-8', 'EUC-KR//TRANSLIT//IGNORE');
//var tranA2U = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');

var chara = new Buffer(4);
var intb = new Buffer(4);
var charc = new Buffer(16);



client.connect(3222, '127.0.0.1');

client.write('message test');



client.on('data', function(data) {
 //console.log('got data: ', data.toString('utf-8')); 

 char1 = data.slice(0, 4);
 char2 = data.slice(4, 8);
 char3 = data.slice(8, 12);
 char4 = data.slice(12, 27);
 console.log('char1 :',  char1.readUInt8());
 console.log('char2 :', char2.toString('utf-8'));
 console.log('char3 :',  char3.readUInt8());
 console.log('char4 :', char4.toString('utf-8'));
 //client.destroy();
});



client.on('close', function() {
 console.log('closed..');
});
//[출처] node.js Socket 예제 (C++ tcp 예제)|작성자 dimigozzang