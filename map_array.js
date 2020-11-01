const { Socket } = require("dgram");
const { ftruncate } = require("fs");

let me = new Map();



me.set('korea', 'gdutjr' );
me.set('love7310', 'rlaxodud#08');
me.set( 'gomplay', 'aaaaaa')

console.log( me.get('korea') ) ;
console.log( me.has(  'love7310' ))

console.log( me.size );

console.log( me.delete('gomplay') );
console.log( me.size );
console.log( "me clear", me.clear() );
console.log( me.size );

// Set
// Set() 은 value 들로 이루어진 컬렉션(“집합”이라는 표현이 적절)
// Array 와는 다르게 Set 은 같은 value 를 
// 
//   2번 포함할 수 없음
// 
// 따라서 Set 에 이미 존재하는 값을 추가하려고 하면 아무 일도 없음

let setA = new Set();

setA.add("korea");
setA.add("bbb");
console.log("set size", setA.size );
setA.clear();
console.log("set size", setA.size)
console.log("set delete: ", setA.delete("aaaa") );

console.log("set size", setA.size)
console.log("set delete: ", setA.delete("bbb") );
console.log("set size", setA.size)


class obj {

    constructor(){
        this.nCompany = 0;
        this.sName = '';
        this.sPassword = '',
        this.sArea = '',
        this.oSocket ;
    }   

};

var map =  new Map();

map.set('love7310', map);
map.set('korea', null);

console.log("map size", map.size);
console.log("map love7310", map.get('love7310'));
temp = map.get('love7310');

temp.nCompany = 10;
temp.sName = '김형석';
temp.sPassword = 'gdutjr';

console.log( 'map love7310', map.get('love7310'));
temp.oSocket = new Object();
console.log( 'map love7310', map.get('love7310'));

map_korea = map.get('korea');
map.delete('khs7310');
map_korea = temp;
console.log ("---------------------------------");
console.log ("map object love7310", map);
console.log ("map object korea", temp);
console.log ("---------------------------------");
map.forEach( lf_viewMap);

function lf_viewMap( value, key, map){
    console.log ("=============start===============");
    console.log('map key ==>', key );
    console.log('map value =========>', value );
    console.log('map.size  ===========>', map.size );
    console.log ("=============end===============");
}


map.set('khs7310', new obj );
console.log('map.size  ===========>', map.size );

map.set('min-io', new obj );
console.log('map.size  ===========>', map.size );

console.log('map_korea.size  ===========>', map_korea.size );


if( map_korea === map)
   console.log("둘다 같습니다. ")
else
    console.log("둘은 틀립니다. ")













