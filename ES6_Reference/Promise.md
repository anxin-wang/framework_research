### Promise对象的含义
> Promise是对一个未知值的代理，它让你可以将handler与异步操作最终的结果，无论是成功或失败联系上。
它让异步方法像同步方法一样的返回结果值：无须立刻返回最终结果，异步方法返回一个promise对象给将来的处理函数。

### Promise对象的三种状态


>  * pending: initial state, neither fulfilled nor rejected.
>  * fulfilled: meaning that the operation completed successfully.
>  * rejected: meaning that the operation failed.

###创建语法
    
    
    new Promise( /* 执行函数 */ function(resolve, reject) { ... } );
    //执行函数在promise对象完成之后立即执行 
    ---------------------------------------------------------
    const myFirstPromise = new Promise((resolve, reject) => {
      // do something asynchronous which eventually calls either:
      //
      //   resolve(someValue); // fulfilled
      // or
      //   reject("failure reason"); // rejected
    });
    ---------------------------------------------------------
    function myAsyncFunction(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
      });
    };
    
## 实际应用

    let myFirstPromise = new Promise((resolve, reject) => {
      // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
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
 
 例子二
 
    'use strict';
    var promiseCount = 0;
    
    function testPromise() {
        let thisPromiseCount = ++promiseCount;
    
        let log = document.getElementById('log');
        log.insertAdjacentHTML('beforeend', thisPromiseCount +
            ') Started (<small>Sync code started</small>)<br/>');
    
        // We make a new promise: we promise a numeric count of this promise, starting from 1 (after waiting 3s)
        let p1 = new Promise(
            // The resolver function is called with the ability to resolve or
            // reject the promise
           (resolve, reject) => {
                log.insertAdjacentHTML('beforeend', thisPromiseCount +
                    ') Promise started (<small>Async code started</small>)<br/>');
                // This is only an example to create asynchronism
                window.setTimeout(
                    function() {
                        // We fulfill the promise !
                        resolve(thisPromiseCount);
                    }, Math.random() * 2000 + 1000);
            }
        );
    
        // We define what to do when the promise is resolved/rejected with the then() call,
        // and the catch() method defines what to do if the promise is rejected.
        p1.then(
            // Log the fulfillment value
            function(val) {
                log.insertAdjacentHTML('beforeend', val +
                    ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
            })
        .catch(
            // Log the rejection reason
           (reason) => {
                console.log('Handle rejected promise ('+reason+') here.');
            });
    
        log.insertAdjacentHTML('beforeend', thisPromiseCount +
            ') Promise made (<small>Sync code terminated</small>)<br/>');
    }
    

### Promise.catch

    var p1 = new Promise(function(resolve, reject) {
      resolve('Success');
    });
    
    p1.then(function(value) {
      console.log(value); // "Success!"
      throw 'oh, no!';
    }).catch(function(e) {
      console.log(e); // "oh, no!"
    }).then(function(){
      console.log('after a catch the chain is restored');
    }, function () {
      console.log('Not fired due to the catch');
    });
    
    // The following behaves the same as above
    p1.then(function(value) {
      console.log(value); // "Success!"
      return Promise.reject('oh, no!');
    }).catch(function(e) {
      console.log(e); // "oh, no!"
    }).then(function(){
      console.log('after a catch the chain is restored');
    }, function () {
      console.log('Not fired due to the catch');
    });
    
> If it is resolved

    //Create a promise which would not call onReject
    var p1 = Promise.resolve("calling next");
    
    var p2 = p1.catch(function (reason) {
        //This is never called
        console.log("catch p1!");
        console.log(reason);
    });
    
    p2.then(function (value) {
        console.log("next promise's onFulfilled"); /* next promise's onFulfilled */
        console.log(value); /* calling next */
    }, function (reason) {
        console.log("next promise's onRejected");
        console.log(reason);
    });
    
> 在异步函数和resolve()之后的reject并不会被触发
    
    // Throwing an error will call the catch method most of the time
    var p1 = new Promise(function(resolve, reject) {
      throw 'Uh-oh!';
    });
    
    p1.catch(function(e) {
      console.log(e); // "Uh-oh!"
    });
    
    // Errors thrown inside asynchronous functions will act like uncaught errors
    var p2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        throw 'Uncaught Exception!';
      }, 1000);
    });
    
    p2.catch(function(e) {
      console.log(e); // This is never called
    });
    
    // Errors thrown after resolve is called will be silenced
    var p3 = new Promise(function(resolve, reject) {
      resolve();
      throw 'Silenced Exception!';
    });
    
    p3.catch(function(e) {
       console.log(e); // This is never called
    });
    
    
### Promise.then

    var p1 = new Promise( (resolve, reject) => {
      resolve('Success!');
      // or
      // reject ("Error!");
    } );
    
    p1.then( value => {
      console.log(value); // Success!
    }, reason => {
      console.log(reason); // Error!
    } );
    
> then可以链式连接

    romise.resolve('foo')
      // 1. Receive "foo" concatenate "bar" to it and resolve that to the next then
      .then(function(string) {
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            string += 'bar';
            resolve(string);
          }, 1);
        });
      })
      // 2. receive "foobar", register a callback function to work on that string
      // and print it to the console, but not before return the unworked on
      // string to the next then
      .then(function(string) {
        setTimeout(function() {
          string += 'baz';
          console.log(string);
        }, 1)
        return string;
      })
      // 3. print helpful messages about how the code in this section will be run
      // before string is actually processed by the mocked asynchronous code in the
      // prior then block.  
      .then(function(string) {
        console.log("Last Then:  oops... didn't bother to instantiate and return " +
                    "a promise in the prior then so the sequence may be a bit " +
                    "surprising");
    
        // Note that `string` will not have the 'baz' bit of it at this point. This 
        // is because we mocked that to happen asynchronously with a setTimeout function
        console.log(string);
      });
      
> 链式的数据会延续，非链式的不会

    var p2 = new Promise(function(resolve, reject) {
      resolve(1);
    });
    
    p2.then(function(value) {
      console.log(value); // 1
      return value + 1;
    }).then(function(value) {
      console.log(value + '- This synchronous usage is virtually pointless'); // 2- This synchronous usage is virtually pointless
    });
    
    p2.then(function(value) {
      console.log(value); // 1
    });
    
    
> 如果function扔出一个error或返回一个rejected的Promise,then将返回一个rejected的Promise

    Promise.resolve()
      .then( () => {
        // Makes .then() return a rejected promise
        throw 'Oh no!';
      })
      .then( () => { 
        console.log( 'Not called.' );
      }, reason => {
        console.error( 'onRejected function called: ', reason );
      });
      
>使用catch来处理rejected的情况

    Promise.resolve()
      .then( () => {
        // Makes .then() return a rejected promise
        throw 'Oh no!';
      })
      .catch( reason => {
        console.error( 'onRejected function called: ', reason );
      })
      .then( () => {
        console.log( "I am always called even if the prior then's promise rejects" );
      });
      
      
> You can also use chaining to implement one function with a Promise-based API on top of another such function.
      
      function fetch_current_data() {
        // The fetch() API returns a Promise.  This function
        // exposes a similar API, except the fulfillment
        // value of this function's Promise has had more
        // work done on it.
        return fetch('current-data.json').then((response) => {
          if (response.headers.get('content-type') != 'application/json') {
            throw new TypeError();
          }
          var j = response.json();
          // maybe do something with j
          return j; // fulfillment value given to user of
                    // fetch_current_data().then()
        });
      }
      
      
>If onFulfilled returns a promise, the return value of then will be resolved/rejected by the promise.
      
      function resolveLater(resolve, reject) {
        setTimeout(function () {
          resolve(10);
        }, 1000);
      }
      function rejectLater(resolve, reject) {
        setTimeout(function () {
          reject(20);
        }, 1000);
      }
      
      var p1 = Promise.resolve('foo');
      var p2 = p1.then(function() {
        // Return promise here, that will be resolved to 10 after 1 second
        return new Promise(resolveLater);
      });
      p2.then(function(v) {
        console.log('resolved', v);  // "resolved", 10
      }, function(e) {
        // not called
        console.log('rejected', e);
      });
      
      var p3 = p1.then(function() {
        // Return promise here, that will be rejected with 20 after 1 second
        return new Promise(rejectLater);
      });
      p3.then(function(v) {
        // not called
        console.log('resolved', v);
      }, function(e) {
        console.log('rejected', e); // "rejected", 20
      });
    
    
### Promise.all

    var p1 = Promise.resolve(3);
    var p2 = 1337;
    var p3 = new Promise((resolve, reject) => {
      setTimeout(resolve, 100, 'foo');
    }); 
    
    Promise.all([p1, p2, p3]).then(values => { 
      console.log(values); // [3, 1337, "foo"] 
    });
    
> 例子二

    // this will be counted as if the iterable passed is empty, so it gets fulfilled
    var p = Promise.all([1,2,3]);
    // this will be counted as if the iterable passed contains only the resolved promise with value "444", so it gets fulfilled
    var p2 = Promise.all([1,2,3, Promise.resolve(444)]);
    // this will be counted as if the iterable passed contains only the rejected promise with value "555", so it gets rejected
    var p3 = Promise.all([1,2,3, Promise.reject(555)]);
    
    // using setTimeout we can execute code after the stack is empty
    setTimeout(function(){
        console.log(p);
        console.log(p2);
        console.log(p3);
    });
    
    // logs
    // Promise { <state>: "fulfilled", <value>: Array[3] }
    // Promise { <state>: "fulfilled", <value>: Array[4] }
    // Promise { <state>: "rejected", <reason>: 555 }
    
> 异步和同步的情况

    // we are passing as argument an array of promises that are already resolved,
    // to trigger Promise.all as soon as possible
    var resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];
    
    var p = Promise.all(resolvedPromisesArray);
    // immediately logging the value of p
    console.log(p);
    
    // using setTimeout we can execute code after the stack is empty
    setTimeout(function(){
        console.log('the stack is now empty');
        console.log(p);
    });
    
    // logs, in order:
    // Promise { <state>: "pending" } 
    // the stack is now empty
    // Promise { <state>: "fulfilled", <value>: Array[2] }
    
    2. The same thing happens if Promise.all rejects:
    
    var mixedPromisesArray = [Promise.resolve(33), Promise.reject(44)];
    var p = Promise.all(mixedPromisesArray);
    console.log(p);
    setTimeout(function(){
        console.log('the stack is now empty');
        console.log(p);
    });
    
    // logs
    // Promise { <state>: "pending" } 
    // the stack is now empty
    // Promise { <state>: "rejected", <reason>: 44 }
    
    3.
    var p = Promise.all([]); // will be immediately resolved
    var p2 = Promise.all([1337, "hi"]); // non-promise values will be ignored, but the evaluation will be done asynchronously
    console.log(p);
    console.log(p2)
    setTimeout(function(){
        console.log('the stack is now empty');
        console.log(p2);
    });
    
    // logs
    // Promise { <state>: "fulfilled", <value>: Array[0] }
    // Promise { <state>: "pending" }
    // the stack is now empty
    // Promise { <state>: "fulfilled", <value>: Array[2] }
    
> 只要有一个reject,则整个返回reject
    
    var p1 = new Promise((resolve, reject) => { 
      setTimeout(resolve, 1000, 'one'); 
    }); 
    var p2 = new Promise((resolve, reject) => { 
      setTimeout(resolve, 2000, 'two'); 
    });
    var p3 = new Promise((resolve, reject) => {
      setTimeout(resolve, 3000, 'three');
    });
    var p4 = new Promise((resolve, reject) => {
      setTimeout(resolve, 4000, 'four');
    });
    var p5 = new Promise((resolve, reject) => {
      reject('reject');
    });
    
    Promise.all([p1, p2, p3, p4, p5]).then(values => { 
      console.log(values);
    }, reason => {
      console.log(reason)
    });
    
    //From console:
    //"reject"
    
    //You can also use .catch
    Promise.all([p1, p2, p3, p4, p5]).then(values => { 
      console.log(values);
    }).catch(reason => { 
      console.log(reason)
    });
    
    //From console: 
    //"reject"
    
#### Promise.race

    var p1 = new Promise(function(resolve, reject) { 
        setTimeout(resolve, 500, 'one'); 
    });
    var p2 = new Promise(function(resolve, reject) { 
        setTimeout(resolve, 100, 'two'); 
    });
    
    Promise.race([p1, p2]).then(function(value) {
      console.log(value); // "two"
      // Both resolve, but p2 is faster
    });
    
    var p3 = new Promise(function(resolve, reject) { 
        setTimeout(resolve, 100, 'three');
    });
    var p4 = new Promise(function(resolve, reject) { 
        setTimeout(reject, 500, 'four'); 
    });
    
    Promise.race([p3, p4]).then(function(value) {
      console.log(value); // "three"
      // p3 is faster, so it resolves
    }, function(reason) {
      // Not called
    });
    
    var p5 = new Promise(function(resolve, reject) { 
        setTimeout(resolve, 500, 'five'); 
    });
    var p6 = new Promise(function(resolve, reject) { 
        setTimeout(reject, 100, 'six');
    });
    
    Promise.race([p5, p6]).then(function(value) {
      // Not called
    }, function(reason) {
      console.log(reason); // "six"
      // p6 is faster, so it rejects
    });
    
> race返回数组中的第一个值

    var foreverPendingPromise = Promise.race([]);
    var alreadyResolvedProm = Promise.resolve(666);
    
    var arr = [foreverPendingPromise, alreadyResolvedProm, "non-Promise value"];
    var arr2 = [foreverPendingPromise, "non-Promise value", Promise.resolve(666)];
    var p = Promise.race(arr);
    var p2 = Promise.race(arr2);
    
    console.log(p);
    console.log(p2);
    setTimeout(function(){
        console.log('the stack is now empty');
        console.log(p);
        console.log(p2);
    });
    
    // logs, in order:
    // Promise { <state>: "pending" } 
    // Promise { <state>: "pending" } 
    // the stack is now empty
    // Promise { <state>: "fulfilled", <value>: 666 }
    // Promise { <state>: "fulfilled", <value>: "non-Promise value" }
    
> 空的数组会永远处于pending状态

    var foreverPendingPromise = Promise.race([]);
    console.log(foreverPendingPromise);
    setTimeout(function(){
        console.log('the stack is now empty');
        console.log(foreverPendingPromise);
    });
    
    // logs, in order:
    // Promise { <state>: "pending" }
    // the stack is now empty
    // Promise { <state>: "pending" }
    
### Promise.resolve

       Promise.resolve('Success').then(function(value) {
         console.log(value); // "Success"
       }, function(value) {
         // not called
       });
 
> 数组的情况
    
    var p = Promise.resolve([1,2,3]);
    p.then(function(v) {
      console.log(v[0]); // 1
    });
    
    
> resolve一个promise对象

    var original = Promise.resolve(33);
    var cast = Promise.resolve(original);
    cast.then(function(value) {
      console.log("value: " + value);
    });
    console.log("original === cast ? " + (original === cast));
    
    // logs, in order:
    // original === cast ? true
    // value: 33
    
> Resolving thenables and throwing Errors

    // Resolving a thenable object
    var p1 = Promise.resolve({ 
      then: function(onFulfill, onReject) { onFulfill('fulfilled!'); }
    });
    console.log(p1 instanceof Promise) // true, object casted to a Promise
    
    p1.then(function(v) {
        console.log(v); // "fulfilled!"
      }, function(e) {
        // not called
    });
    
    // Thenable throws before callback
    // Promise rejects
    var thenable = { then: function(resolve) {
      throw new TypeError('Throwing');
      resolve('Resolving');
    }};
    
    var p2 = Promise.resolve(thenable);
    p2.then(function(v) {
      // not called
    }, function(e) {
      console.log(e); // TypeError: Throwing
    });
    
    // Thenable throws after callback
    // Promise resolves
    var thenable = { then: function(resolve) {
      resolve('Resolving');
      throw new TypeError('Throwing');
    }};
    
    var p3 = Promise.resolve(thenable);
    p3.then(function(v) {
      console.log(v); // "Resolving"
    }, function(e) {
      // not called
    });

### Promise.reject() 

    Promise.reject(new Error('fail')).then(function(error) {
      // not called
    }, function(error) {
      console.log(error); // Stacktrace
    });
    
    
### Promise的优点

> 以前写异步函数

    doSomething(function(result) {
      doSomethingElse(result, function(newResult) {
        doThirdThing(newResult, function(finalResult) {
          console.log('Got the final result: ' + finalResult);
        }, failureCallback);
      }, failureCallback);
    }, failureCallback);
    
> 现在

    doSomething().then(function(result) {
      return doSomethingElse(result);
    })
    .then(function(newResult) {
      return doThirdThing(newResult);
    })
    .then(function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    })
    .catch(failureCallback);
    
> 箭头函数

    doSomething()
    .then(result => doSomethingElse(result))
    .then(newResult => doThirdThing(newResult))
    .then(finalResult => {
      console.log(`Got the final result: ${finalResult}`);
    })
    .catch(failureCallback);
    
>在catch后面加一个then

    new Promise((resolve, reject) => {
        console.log('Initial');
        resolve();
    })
    .then(() => {
        throw new Error('Something failed');       
        console.log('Do this');
    })
    .catch(() => {
        console.log('Do that');
    })
    .then(() => {
        console.log('Do this whatever happened before');
    });
    
    Output:
    Initial
    Do that
    Do this whatever happened before
    
改造旧API
    
    setTimeout(() => saySomething("10 seconds passed"), 10000);
    
    改成
    
    const wait = ms => new Promise((resolve,rejected) => setTimeout(() => resolve("Success! After 10 seconds"), ms));
    function saySomething(msg) {
        console.log(msg);
    }
    wait(10000).then((msg) => saySomething(msg)).catch(saySomething("failure"));