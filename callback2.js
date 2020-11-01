function callback2(cb){
    cb();
}

function add(x, y){
    let sum = x + y;
    callback2( function(){
        console.log(sum);
    })
}

add(3,5);