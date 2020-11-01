function task1( x ){
    console.log("Task1 시작");
    let sum = x + 5;
    setTimeout( function() {
        
        callback(sum, task2);
        console.log( "sum: %d", sum);
        console.log('Task1 끝');
    },600);
}

function task2( x, callback ){
    console.log( 'Task2 시작');
    let sum = x + 5;
    setTimeout( function( result2 ) {
       // callback(result1);
        console.log( "sum: %d", sum);
        console.log('Task2 끝');
        
    },150);
};

function task3( x, callback2 ){
    console.log( 'Task3 시작');
    let sum = x + 5;
    setTimeout( function() {
        console.log( "sum: %d", sum);
        console.log('Task3 끝');
        //callback();
    },150);
};


var result = 5;
task1( result );

/*
task1();
task2();
*/

/*

var result = 5;
task1(function( result ) {
    task2(function(){
        task3(function(){

        });
    });
    
});
*/