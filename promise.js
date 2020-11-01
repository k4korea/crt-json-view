/*
var Promise = require('promise');

var asyncfunction = function(param){
      return new Promise(function(fullfilled,rejected){
           setTimeout(
                 function(){
                       rejected(Error('this is err '+param));
                 },2000);
      });
}

asyncfunction(' terry ').then(console.log,console.error);

asyncfunction('cath').then(console.log).catch(console.error);
*/

var Promise = require('promise');

/*
let promise2 = new Promise(function(resolve, reject) {
    // Some imaginary 2000 ms timeout simulating a db call
    setTimeout(()=> {
        a = 1;
        if ( a==1 ) {
            resolve({msg: 'It works', data: 'some data'});
        } else {
            // If promise can not be fulfilled due to some errors like network failure
            reject(new Error({msg: 'It does not work'}));
        }
    }, 2000);
});
*/
let myFirstPromise = new Promise((resolve, reject) => {  
    // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
    // In this example, we use setTimeout(...) to simulate async code. 
    // In reality, you will probably be using something like XHR or an HTML5 API.
    setTimeout(function(){
      resolve("Success!"); // Yay! Everything went well!
    }, 250);
  });
  
  myFirstPromise.then((successMessage) => {
    // successMessage is whatever we passed in the resolve(...) function above.
    // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
    console.log("Yay! " + successMessage);
  });



  var promiseCount = 0;

function testPromise() {
    var thisPromiseCount = ++promiseCount;

    var log = ''; //document.getElementById('log');
    console.log('beforeend', thisPromiseCount +
        ') 시작 (<small>동기적 코드 시작</small>)<br/>');

    // 새 프로미스 생성 - 프로미스의 생성 순서를 전달하겠다는 약속을 함 (3초 기다린 후)
    var p1 = new Promise(
        // 실행 함수는 프로미스를 이행(resolve)하거나
        // 거부(reject)할 수 있음
        function(resolve, reject) {
            console.log('beforeend', thisPromiseCount +
                ') 프로미스 시작 (<small>비동기적 코드 시작</small>)<br/>');
            // setTimeout은 비동기적 코드를 만드는 예제에 불과
            resolve( thisPromiseCount);
            /*
            window.setTimeout(
                function() {
                    // 프로미스 이행 !
                    resolve(thisPromiseCount);
                }, Math.random() * 2000 + 1000);
                */
        }
    );

    // 프로미스를 이행했을 때 할 일은 then() 호출로 정의하고,
    // 거부됐을 때 할 일은 catch() 호출로 정의
    p1.then(
        // 이행 값 기록
        function(val) {
            console.log('beforeend', val +
                ') 프로미스 이행 (<small>비동기적 코드 종료</small>)<br/>');
        })
    .catch(
        // 거부 이유 기록
        function(reason) {
            console.log('여기서 거부된 프로미스(' + reason + ')를 처리하세요.');
        });

        console.log('beforeend', thisPromiseCount +
        ') 프로미스 생성 (<small>동기적 코드 종료</small>)<br/>');
}

//testPromise();


/*
function testPromise() {
    var thisPromiseCount = ++promiseCount;    
    console.log('beforeend', thisPromiseCount + ') 시작 (<small>동기적 코드 시작</small>)<br/>');
    // 새 프로미스 생성 - 프로미스의 생성 순서를 전달하겠다는 약속을 함 (3초 기다린 후)
    var p1 = new Promise(
        // 실행 함수는 프로미스를 이행(resolve)하거나
        // 거부(reject)할 수 있음
        function(resolve, reject) {
            console.log('beforeend', thisPromiseCount + ') 프로미스 시작 (<small>비동기적 코드 시작</small>)<br/>');           
            var return_resolve = resolve( thisPromiseCount);
            console.log("return_resolve", return_resolve);
           
        }
    );

    var p2 = p1.then(
        // 이행 값 기록
        function(val) {
            console.log('beforeend', val +
                ') 프로미스 이행 (<small>비동기적 코드 종료</small>)<br/>');
            return 4;
        })
    .catch(
        // 거부 이유 기록
        function(reason) {
            console.log('여기서 거부된 프로미스(' + reason + ')를 처리하세요.');
            return 3;
        }
        
     );
     
     
//        return 2;
        console.log('beforeend', thisPromiseCount +   ') 프로미스 생성 (<small>동기적 코드 종료</small>)<br/>');
     return p2
}
*/

function testPromise() {
    var thisPromiseCount = ++promiseCount;    
    console.log('beforeend', thisPromiseCount + ') 시작 (<small>동기적 코드 시작</small>)<br/>');
    // 새 프로미스 생성 - 프로미스의 생성 순서를 전달하겠다는 약속을 함 (3초 기다린 후)
    var p1 = new Promise(
        // 실행 함수는 프로미스를 이행(resolve)하거나
        // 거부(reject)할 수 있음
        function(resolve, reject) {
            console.log('beforeend', thisPromiseCount + ') 프로미스 시작 (<small>비동기적 코드 시작</small>)<br/>');           
            var return_resolve = resolve( thisPromiseCount);
            console.log("return_resolve", return_resolve);
           
        }
    );

    return p1.then(
        // 이행 값 기록
        function(val) {
            console.log('beforeend', val +
                ') 프로미스 이행 (<small>비동기적 코드 종료</small>)<br/>');
            return 4;
        })
    .catch(
        // 거부 이유 기록
        function(reason) {
            console.log('여기서 거부된 프로미스(' + reason + ')를 처리하세요.');
            return 3;
        }
        
     );
     
     
//        return 2;
        console.log('beforeend', thisPromiseCount +   ') 프로미스 생성 (<small>동기적 코드 종료</small>)<br/>');
     return p2
}

result = ''
result2 = ''

var result = testPromise( ).then( (res) =>{
    console.log( res);
});
console.log( "out_result",result);
console.log( "out_result2",result2);
