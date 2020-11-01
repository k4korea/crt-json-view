



function square(x, callback) {
    setTimeout(callback, 100, x*x);
}

square(2, firstCallback);

var firstCallback= function (number) {
    square(number, secondCallback);
}
/*
var secondCallback = function (number) {
    square(number, thirdCallback);
}

var thirdCallback = function (number) {
    console.log(number);
}
*/

//출처: https://beomy.tistory.com/10 [beomy]