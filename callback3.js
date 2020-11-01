function task1( x ){
    console.log("Task1 시작");
    let sum = x + 5;
    callback( task2);
    console.log( "sum: %d", sum);
    
}

function task2( x, callback ){
    console.log( 'Task2 시작');
    let sum = x + 5;
          // callback(result1);
        console.log( "sum: %d", sum);
        console.log('Task2 끝');
        
    
};


task1(5);