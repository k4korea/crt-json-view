
var i =1;
intervalObj = setInterval( intervalFunc, 5  * 1000);
    
function intervalFunc(){
    console.log(" 전역차 : " , i);
    i++;
    if( i == 7) clearInterval(intervalObj);
}
    
