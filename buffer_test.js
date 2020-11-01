

buf_04 = Buffer( '00 10 00 00');
buf_05 = Buffer( '00100000');
buf_06 = Buffer( '0x00 0x10 0x00 0x00');
buf_07 = Buffer( '0x10');
 
console.log("buf_04 ascii print : " + buf_04.toString("ascii"));
console.log("buf_04 ascii print[0-10] : " + buf_04.toString('ascii', 0, 10));
console.log("buf_04 hex print : " + buf_04.toString("hex"));
console.log("buf_04 utf8 print : " + buf_04.toString("utf8"));
console.log("buf_04 binary print : " + buf_04.toString("binary"));
console.log("buf_04 int : " + buf_04.readUInt16LE() )
console.log("buf_04 int : " + buf_04.readUInt16BE() )
console.log("buf_04 ascii : " + buf_04.toString("ascii") )
console.log("buf_04 binary : " + buf_04.toString("binary") )
console.log("buf_04 int : " + buf_04.readInt8(0) )
console.log("buf_04 int : " + buf_04.readUInt16LE(0) )
console.log("buf_04 value : " + buf_04.values() )
console.log("buf_04 size : " + buf_04.length )
console.log("buf_04 size : " + buf_04[0] )
console.log("buf_04 size : " + buf_04[1] )
console.log("buf_04 size : " + buf_04[2] )
console.log("buf_04 size : " + buf_04[3] )
console.log("buf_04 size : " + buf_04[4] )
console.log("buf size : " + buf_04.writeUInt16BE(12,0) )
console.log("buf size : " + buf_04.writeUInt16LE(12,0) )
//console.log("concat size : " + Buffer.concat(buf_04) )

const integer = parseInt(buf_07.toString("hex"), 16)
console.log("integer : " + integer )

