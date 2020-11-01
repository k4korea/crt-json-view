var DATA ={}


var VARTYPE = {};

DATA.TYPE = {};
DATA.TYPE.Int = 1;
DATA.TYPE.UnsignedInt = 2;
DATA.TYPE.Int16 = 5;
DATA.TYPE.Int64 = 9;
DATA.TYPE.UnsignedInt64 = 10;
DATA.TYPE.Bool = 11;
DATA.TYPE.Char = 12;
DATA.TYPE.SignedChar = 13;
DATA.TYPE.UnsignedChar = 14;
DATA.TYPE.Short = 15;
DATA.TYPE.UnsignedShort = 16;
DATA.TYPE.Long = 17;
DATA.TYPE.UnsignedLong = 18;
DATA.TYPE.DWord = 18;
DATA.TYPE.LongLong = 19;
DATA.TYPE.UnsignedLongLong = 20;
DATA.TYPE.Float = 22;
DATA.TYPE.Double = 23;
DATA.TYPE.LongDouble = 24;
DATA.TYPE.DateTime = 25;
DATA.TYPE.IntArray = 26;
DATA.TYPE.Data = 27;
DATA.TYPE.DBTIMESTAMP = 28;
DATA.TYPE.OLEDATETIME = 29;



VARTYPE.Int = function() { return DATA.TYPE.Int; };
VARTYPE.UInt = function() { return DATA.TYPE.Int; };
VARTYPE.UnsignedInt = function() { return DATA.TYPE.UnsignedInt; };
VARTYPE.Int16 = function() { return DATA.TYPE.Int16; };
VARTYPE.Int64 = function() { return DATA.TYPE.Int64; };
VARTYPE.Bool = function() { return DATA.TYPE.Bool; };
VARTYPE.Char = function() { return DATA.TYPE.Char; };
VARTYPE.SignedChar = function() { return DATA.TYPE.SignedChar; };
VARTYPE.UnsignedChar = function() { return DATA.TYPE.UnsignedChar; };
VARTYPE.Short = function() { return DATA.TYPE.Short; };
VARTYPE.Long = function() { return DATA.TYPE.Long; };
VARTYPE.UnsignedLong = function() { return DATA.TYPE.UnsignedLong; };
VARTYPE.DWord = function() { return DATA.TYPE.DWord; };
VARTYPE.LongLong = function() { return DATA.TYPE.LongLong; };
VARTYPE.UnsignedLongLong = function() { return DATA.TYPE.UnsignedLongLong; };
VARTYPE.Float = function() { return DATA.TYPE.Float; };
VARTYPE.Double = function() { return DATA.TYPE.Double; };
VARTYPE.LongDouble = function() { return DATA.TYPE.LongDouble; };
VARTYPE.DateTime = function() { return DATA.TYPE.DateTime; };
VARTYPE.IntArray = function() { return DATA.TYPE.IntArray; };
VARTYPE.Data = function() { return DATA.TYPE.Data; };
VARTYPE.DBTIMESTAMP = function() { return DATA.TYPE.DBTIMESTAMP; };
VARTYPE.OLEDATETIME = function() { return DATA.TYPE.OLEDATETIME; };


VARTYPE.getTypeSize = function(type, userDefSize) {
    switch (type) {
        case DATA.TYPE.Int: return 4;
        case DATA.TYPE.UnsignedInt: return 4;
        case DATA.TYPE.Int16: return 2;
        case DATA.TYPE.Int64: return 8;
        case DATA.TYPE.UnsignedInt64: return 8;
        case DATA.TYPE.Bool: return 4;
        case DATA.TYPE.Char: return userDefSize;
        case DATA.TYPE.SignedChar: return userDefSize;
        case DATA.TYPE.UnsignedChar: return userDefSize;
        case DATA.TYPE.Short: return 2;
        case DATA.TYPE.UnsignedShort: return 2;
        case DATA.TYPE.Long: return 4;
        case DATA.TYPE.DWord: return 4;
        case DATA.TYPE.UnsignedLong: return 4;
        case DATA.TYPE.LongLong: return 8;
        case DATA.TYPE.UnsignedLongLong: return 8;
        case DATA.TYPE.Float: return 4;
        case DATA.TYPE.Double: return 8;
        case DATA.TYPE.LongDouble: return 8;
        case DATA.TYPE.Date: return 8;
        case DATA.TYPE.IntArray: return 4 * userDefSize;
        case DATA.TYPE.DBTIMESTAMP: return 16;
        case DATA.TYPE.OLEDATETIME: return 12;
        case DATA.TYPE.Data: return userDefSize;
    }
    console.log('VARTYPE.getTypeSize unknown', type, userDefSize);
    throw new Error('VARTYPE.getTypeSize unknown error');
    
};

VARTYPE.getDefaultValue = function(type, defaultValue,bBuffer) {

	if(!bBuffer) {
		bBuffer = false;
	}
	
	if (defaultValue){
		return defaultValue;
	}

    switch (type) {
        case DATA.TYPE.Int:
            return 0;
        case DATA.TYPE.IntArray:
            var arr = [];
            return arr;
        case DATA.TYPE.UnsignedInt:
            return 0;

        case DATA.TYPE.Int16:
            return 0;

            //        case DATA.TYPE.Int64:
            //           return buf.readInt64BE(offset);
            //        case DATA.TYPE.UnsignedInt64: return 8;
        case DATA.TYPE.Bool:
            return false;

        case DATA.TYPE.Char:
        case DATA.TYPE.SignedChar:
        case DATA.TYPE.UnsignedChar:
			if(true === bBuffer) {
				return new Buffer.from('');
			}
            return '';

        case DATA.TYPE.Short:
            return 0;


        case DATA.TYPE.UnsignedShort:
            return 0;

        case DATA.TYPE.Long:
            return 0;

        case DATA.TYPE.DWord:
            return 0;

            
        case DATA.TYPE.UnsignedLong:
            return 0;

        case DATA.TYPE.UnsignedLongLong:
            return 0;
            //       case DATA.TYPE.LongLong: return 8;
            //       case DATA.TYPE.UnsignedLongLong: return 8;
        case DATA.TYPE.Float:
            return 0.0;

        case DATA.TYPE.Double:
        case DATA.TYPE.LongDouble:
            return 0.0;
        case DATA.TYPE.Data:
            return new Buffer.alloc(0);
        case DATA.TYPE.DateTime:
            return (new Date());
        case DATA.TYPE.DBTIMESTAMP:
            return (new Date());
        case DATA.TYPE.OLEDATETIME:
            return (new Date());
    }
    throw new Error('VARTYPE.getDefaultValue unknown error type=' + type);
    
};

VARTYPE.getValue = function(type, userDefSize, buf, offset, bigE , bBuffer) {
    var res = {};
    
    if(!bBuffer){
    	bBuffer = false;
    }
    
    switch (type) {
        case DATA.TYPE.Int:
            res.offset = offset + 4;
            if (true === bigE){
              res.value = buf.readInt32BE(offset);
            }
            else {
              res.value = buf.readInt32LE(offset);
            }
            return res;

        case DATA.TYPE.UnsignedInt:
            res.offset = offset + 4;
            if (true === bigE) {
              res.value = buf.readUInt32BE(offset);
            }
            else {
              res.value = buf.readUInt32LE(offset);
            }
            return res;

        case DATA.TYPE.Int16:
            res.offset = offset + 2;
            if (true === bigE) {
              res.value = buf.readInt16BE(offset);
            }
            else {
              res.value = buf.readInt16LE(offset);
            }
            return res;

            //        case DATA.TYPE.Int64:
            //           return buf.readInt64BE(offset);
            //        case DATA.TYPE.UnsignedInt64: return 8;
        case DATA.TYPE.Bool:
            res.offset = offset + 4;
            if (true === bigE) {
              res.value = buf.readInt32BE(offset) === 0 ? false : true;
            }
            else {
              res.value = buf.readInt32LE(offset) === 0 ? false : true;
            }
            return res;

        case DATA.TYPE.Char:
        case DATA.TYPE.SignedChar:
        case DATA.TYPE.UnsignedChar:
            {
                res.offset = offset + userDefSize;
                var strBuf = new Buffer.alloc(userDefSize);
                buf.copy(strBuf, 0, offset);
                    //                var nIndex = strBuf.toString().indexOf('\0');
                    //                if (nIndex >= 0) strBuf = strBuf.slice(0, nIndex + 1);

                    //                console.log('strBuf=', strBuf);
                var index = 0;
                if(false === bBuffer) {
					res.value = tranA2U.convert(strBuf).toString();
					index = res.value.indexOf('\u0000');
					if (index >= 0) {
					res.value = res.value.substring(0, index);
					}
                } else {
					index = 0;
					for(index = 0;index < strBuf.length ;index++) {
						if(strBuf[index] === 0x00) {break;}
					}
					res.value = strBuf.slice(0,index);
                }
                //console.log('res.value=', res);
                return res;
           }
           break;
        case DATA.TYPE.Short:
            res.offset = offset + 2;
            if (true === bigE) {
              res.value = buf.readInt16BE(offset);
            }
            else {
              res.value = buf.readInt16LE(offset);
            }
            return res;


        case DATA.TYPE.UnsignedShort:
            res.offset = offset + 2;
            if (true === bigE) {
              res.value = buf.readUInt16BE(offset);
            }
            else {
              res.value = buf.readUInt16LE(offset);
            }
            return res;

        case DATA.TYPE.Long:
            res.offset = offset + 4;
            if (true === bigE) {
              res.value = buf.readInt32BE(offset);
            }
            else {
              res.value = buf.readInt32LE(offset);
            }
            return res;

        case DATA.TYPE.DWord:
        case DATA.TYPE.UnsignedLong:
            res.offset = offset + 4;
            if (true === bigE) {
              res.value = buf.readUInt32BE(offset);
            }
            else {
              res.value = buf.readUInt32LE(offset);
            }
            return res;

            //       case DATA.TYPE.LongLong: return 8;
            //       case DATA.TYPE.UnsignedLongLong: return 8;
        case DATA.TYPE.Float:
            res.offset = offset + 4;
            if (true === bigE) {
              res.value = buf.readFloatBE(offset);
            }
            else {
              res.value = buf.readFloatLE(offset);
            }
            return res;

        case DATA.TYPE.Double:
        case DATA.TYPE.LongDouble:
            res.offset = offset + 8;
            if (true === bigE) {
              res.value = buf.readDoubleBE(offset);
            }
            else {
              res.value = buf.readDoubleLE(offset);
            }
            return res;
        case DATA.TYPE.DBTIMESTAMP:
            res.offset = offset + 16;
            var year, month, day, hour, minute, second, fraction;

            if (true === bigE) {
              year = buf.readInt16BE(offset);
            }
            else {
              year = buf.readInt16LE(offset);
            }

            offset += 2;
            if (true === bigE) {
              month = buf.readUInt16BE(offset);
            }
            else {
              month = buf.readUInt16LE(offset);
            }

            offset += 2;
            if (true === bigE) {
              day = buf.readUInt16BE(offset);
            }
            else {
              day = buf.readUInt16LE(offset);
            }

            offset += 2;
            if (true === bigE) {
              hour = buf.readUInt16BE(offset);
            }
            else{
              hour = buf.readUInt16LE(offset);
            }

            offset += 2;
            if (true === bigE) {
              minute = buf.readUInt16BE(offset);
            }
            else {
              minute = buf.readUInt16LE(offset);
            }

            offset += 2;
            if (true === bigE) {
              second = buf.readUInt16BE(offset);
            }
            else {
              second = buf.readUInt16LE(offset);
            }

            offset += 4;
            if (true === bigE) {
              fraction = buf.readUInt32BE(offset);
            }
            else {
              fraction = buf.readUInt32LE(offset);
            }

            res.value = new Date(year, month - 1, day, hour, minute, second, 0);
            return res;
    }

    console.log('VARTYPE.getValue unknown type', type, userDefSize);
    throw new Error('VARTYPE.getValue unknown error type=' + type);

};

VARTYPE.setValue = function(bModeUTF8, value, type, userDefSize, offset, bigE) {
    //console.log('VARTYPE.setValue', value, type, userDefSize, offset, bigE);
    var res = {};
    switch (type) {
        case DATA.TYPE.Int:
            if (true === Util.isNull(value)){ value = 0;}
            res.offset = offset + 4;
            res.value = new Buffer.alloc(4);
            if (true === bigE) {res.value.writeInt32BE(parseInt(value, 10), 0);}
            else {res.value.writeInt32LE(parseInt(value, 10), 0);}
            return res;

        case DATA.TYPE.UnsignedInt:
            if (true === Util.isNull(value)) {value = 0;}
            if(value < 0 ) {value = 0;}
            res.offset = offset + 4;
            res.value = new Buffer.alloc(4);
            if (true === bigE) {res.value.writeUInt32BE(parseInt(value, 10), 0);}
            else {res.value.writeUInt32LE(parseInt(value, 10), 0);}
            return res;

        case DATA.TYPE.Int16:
            if (true === Util.isNull(value)) {value = 0;}
            res.offset = offset + 2;
            res.value = new Buffer.alloc(2);
            if (true === bigE) {res.value.writeInt16BE(parseInt(value, 10), 0);}
            else {res.value.writeInt16LE(parseInt(value, 10), 0);}
            return res;

            //        case DATA.TYPE.Int64:
            //           return buf.readInt64BE(offset);
            //        case DATA.TYPE.UnsignedInt64: return 8;
        case DATA.TYPE.Bool:
            value = Util.parseInt(value);
            res.offset = offset + 4;
            res.value = new Buffer.alloc(4);
            if (true === bigE) {res.value.writeInt32BE(value,0);}
            else {res.value.writeInt32LE(value,0);}
            return res;

        case DATA.TYPE.Char:
        case DATA.TYPE.SignedChar:
        case DATA.TYPE.UnsignedChar:

                if (true === Util.isNull(value)) {value = '';}
                res.offset = offset + userDefSize;
                var buf = value;
                if (false === bModeUTF8) {buf = tranU2A.convert(value);}

                res.value = new Buffer.alloc(userDefSize);
                res.value.fill(0);
                buf.copy(res.value, 0);

                return res;

        case DATA.TYPE.Short:
            if (true === Util.isNull(value)) {value = 0;}
            res.offset = offset + 2;
            res.value = new Buffer.alloc(2);
            if (true === bigE) {res.value.writeInt16BE(parseInt(value, 10), 0);}
            else {res.value.writeInt16LE(parseInt(value, 10), 0);}
            return res;


        case DATA.TYPE.UnsignedShort:
            if (true === Util.isNull(value)) {value = 0;}
            value = parseInt(value, 10);
            res.offset = offset + 2;
            res.value = new Buffer.alloc(2);
            if (true === bigE) {res.valuewriteUInt16BE(value, 0);}
            else {res.value.writeUInt16LE(value, 0);}
            return res;

        case DATA.TYPE.Long:
            if (true === Util.isNull(value)) {value = 0;}
            value = parseInt(value, 10);
            res.offset = offset + 4;
            res.value = new Buffer.alloc(4);
            if (true === bigE) {res.value.writeInt32BE(value, 0);}
            else {res.value.writeInt32LE(value, 0);}
            return res;

        case DATA.TYPE.DWord:
        case DATA.TYPE.UnsignedLong:
            if (true === Util.isNull(value)) {value = 0;}
            value = parseInt(value, 10);
            res.offset = offset + 4;
            res.value = new Buffer.alloc(4);
            if (true === bigE) {res.value.writeUInt32BE(value, 0);}
            else {res.value.writeUInt32LE(value, 0);}
            return res;

            //       case DATA.TYPE.LongLong: return 8;
            //       case DATA.TYPE.UnsignedLongLong: return 8;
        case DATA.TYPE.Float:
            if (true === Util.isNull(value)) {value = 0.0;}
            value = parseFloat(value);
            res.offset = offset + 4;
            res.value = new Buffer.alloc(4);
            if (true === bigE) {res.value.writeFloatBE(value, 0);}
            else {res.value.writeFloatLE(value, 0);}
            return res;

        case DATA.TYPE.Double:
        case DATA.TYPE.LongDouble:
            if (true === Util.isNull(value)) {value = 0.0;}
            value = parseFloat(value);
            res.offset = offset + 8;
            res.value = new Buffer.alloc(8);
            if (true === bigE) {res.value.writeDoubleBE(value, 0);}
            else {res.value.writeDoubleLE(value, 0);}
            return res;

        case DATA.TYPE.DBTIMESTAMP:
            if (true === Util.isNull(value)) {value = new Date();}
            res.offset = offset + 16;
            res.value = new Buffer.alloc(16);
            var year, month, day, hour, minute, second, fraction;
            year = value.getFullYear();
            month = value.getMonth();
            day = value.getDate();
            hour = value.getHours();
            minute = value.getMinutes();
            second = value.getSeconds();
            fraction = value.getMilliseconds();

            if (true === bigE) {res.value.writeInt16BE(year, 0);}
            else {res.value.writeInt16LE(year, 0);}

            if (true === bigE) {res.value.writeUInt16BE(month, 2);}
            else {res.value.writeUInt16BE(month, 2);}


            if (true === bigE) {res.value.writeUInt16BE(day, 4);}
            else {res.value.writeUInt16BE(day, 4);}

            if (true === bigE) {res.value.writeUInt16BE(hour, 6);}
            else {res.value.writeUInt16BE(hour, 6);}

            if (true === bigE) {res.value.writeUInt16BE(minute, 8);}
            else {res.value.writeUInt16BE(minute, 8);}

            if (true === bigE) {res.value.writeUInt16BE(second, 10);}
            else {res.value.writeUInt16BE(second, 10);}

            if (true === bigE) {res.value.writeUInt32BE(fraction, 12);}
            else {res.value.writeUInt32BE(fraction, 12);}

            return res;

        case DATA.TYPE.OLEDATETIME:
            if (true === Util.isNull(value)) {value = new Date();}
            res.offset = offset + 12;
            res.value = new Buffer.alloc(12);

            if (true === bigE) {
                res.value.writeDoubleBE(25621 + value.getTime() / (1000 * 60 * 60 * 24) + 9 / 24, 0);
                res.value.writeInt32BE(0, 8);
            }
            else {
                res.value.writeDoubleLE(25621 + value.getTime() / (1000 * 60 * 60 * 24) + 9 / 24, 0);
                res.value.writeInt32LE(0, 8);
            }

            return res;
    }

    console.log('VARTYPE.setValue unknown type', type);
    throw new Error('VARTYPE.setValue unknown error type=' + type);

};

exports.DATA = DATA;

exports.VARTYPE = VARTYPE;


/*

 var dtStart = new Date();
    self.init();
    var start = 0;
    var key = 0;
    var type = 0;
    var name = '';
    var col_size = 0;
    var bBuffer ;
    var res = null;
    var data_info = null;
    var cols_info = Global.OMM.cols_info;
    if (null === Util.objAddr(cols_info)) {
		cols_info = [];
		for (key = 0;key < ORDER_INFO.DATATYPE.length ; key++) {
			data_info = {type:ORDER_INFO.DATATYPE[key].type,size:ORDER_INFO.DATATYPE[key].size,name:ORDER_INFO.DATATYPE[key].name, bBuffer:false };
			cols_info.push(data_info);
		}
		Global.OMM.cols_info = cols_info;
    }
    
 while (start < data.length) {
        var orderBuf = data.slice(start, start + size);
        start += size;

        var offset = 0;
        var order = {};
        key = 0;
        for (;key < ORDER_INFO.DATATYPE.length ; key++) {

			data_info = cols_info[key];
			res = VARTYPE.getValue(data_info.type, data_info.size, orderBuf, offset, false ,data_info.bBuffer );
			
			offset = res.offset;
			//if (null === Util.objAddr(res.value)) {res.value = VARTYPE.getDefaultValue(type , bBuffer);}
			order[data_info.name] = res.value;
        }
        
        //        console.log('order=', order);
        self.getOrder().push(order);
        if (order.nState === 11) {self.getPrivateOrder().push(order);}
        else if (10 === order.nState || 70 === order.nState) {

*/        