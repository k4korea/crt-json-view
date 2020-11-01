

import STRUCTCPP from "cpp-struct-js";
import ICONV from "iconv";
import BUFFTRIM from "node-buffertrim";

//CLASS - CProtUtil

export class CProtUtil
{

    constructor(){}
    static getUINT16toUINT8Arr(val)
    {
        let dat16 = new Uint16Array([val]);
        let dat8  = new Uint8Array(dat16.buffer);
        dat16     = null;
        return dat8;
    }

    static getBuffTrim(buf) //"getBuffTrim(.)"버퍼양옆의 빈값 제거
    {
        return BUFFTRIM.trim(buf);
    }

    static getUINT8ArrToUINT16(uint8Arr)
    {
        let uint8buf = Buffer.from(uint8Arr);
        let uint16    = uint8buf.readUIntLE(0, uint8buf.length);
        uint8buf     = null;
        return uint16;
    }
    static getUINT8ArrToString(uint8Arr, encoding)
    {
        let iv  = new ICONV.Iconv(encoding, 'utf-8');
        let uint8buf = CProtUtil.getBuffTrim(Buffer.from(uint8Arr)); //"getBuffTrim(.)"버퍼양옆의 빈값 제거
        let str  = iv.convert(uint8buf).toString();
        uint8buf = null;
        iv          = null;
        return str;

    }

    static getStringToUINT8Arr(dat, encoding)
    {
        let iv  = new ICONV.Iconv('utf-8', encoding);
        let buf = Buffer.from(dat); //let strEncoding = JSCHARDET.detect(buf);
        let buf_cvt = iv.convert(buf);
        iv   = null;
        buf = null;
        return buf_cvt;

    }

    static convertStructType(struct, dat)
    {
        let tmpData = null;
        if(dat instanceof Uint8Array) //uint8array buf type
        {
            tmpData = struct.decode(dat, 0, {endian:"LE"});
        }
        else {
            tmpData = dat;
        }
        return tmpData;
    }


    static convertArrDecode(cls, arrDat, cnt, encoding) //class, arrData, cnt, encoding
    {

        let arr = new Array();
        let tmpInfo = null;
        for(let i=0; i<cnt; i++)
        {
            tmpInfo = arrDat[i];
            if(tmpInfo)
            {
                arr.push(cls.getDecode(tmpInfo, encoding));
            }
        }

        return arr;
    }
}
