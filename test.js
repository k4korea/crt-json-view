const  Writeable  = require("stream");

class myWritableStream extends Writeable {
    
}


myWritableStream.prototype.write = function( chunk, encodeing,callback){
    console.log( chunk.toString);
    console.log("bb");
    //callback();
    return chunk.toString;
}

/*
const outStream = new myWritableStream();
process.stdin.pipe( outStream );
*/

const buf = Buffer.from([0,5]);
console.log( "여기:" , buf.readInt8(1   )) ;



// 1 번째경우
  var data = '  ╝   abcd fghijkl'

  console.log("data: ", data );
       var inta = data.slice(0,1);
       var chara = data.slice(4,9);
       var charb = data.slice(9,16);

        
  //  4
  //  5
  //  7
  
  // 1 번째경우
 var testBuf =  Buffer(15,'  ╝   abcd fghijkl');


 
var inta =  Buffer.allocUnsafe(4);
var chara = Buffer.allocUnsafe(5);
var charb = Buffer.allocUnsafe(7);

 console.log("testBuf", testBuf);


/*
const buf2 = Buffer.allocUnsafe(4);
buf2 = 4;

console.log( "여기2:" , buf2.readInt8(0) );
*/
