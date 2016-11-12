# [Mozilla JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

## Function
### arguments

arguments是一个类数组对象，只有数组的长度属性length,没有数组的其他属性和方法，可以对其进行这样的访问：

	arguments[0]
	arguments[1]
	arguments[2]

也可以这样设值:

    arguments[1]="new value"

可以这样将arguments转换成真实的array对象：

    var args=Array.prototype.slice.call(arguments);
    // 或
    var args = Array.from(arguments);
    // 或
    var args = [...arguments];
    // 或
    var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));

Javascript中函数的实参个数可以大于形参个数时，获取时可以使用arguments来获取。使用arguments.length来确定究竟有多少个参数【实参】，使用arguments[index]来迭代处理每个函数参数。而获得形参个数则通过Function.length属性。

arguments既然是类数组，那么它的类型是object。

#### arguments的属性和方法

	1.arguments.callee
	2.arguments.length
	3.arguments[@@iterator]


#### 例子
##### example1：定义一个连接字符串的函数，形参只设置一个连接符号。

	function myConcat(separator) {
  		var args = Array.prototype.slice.call(arguments, 1);
  		return args.join(separator);
	}
	// returns "red, orange, blue"
	myConcat(", ", "red", "orange", "blue");

	// returns "elephant; giraffe; lion; cheetah"
	myConcat("; ", "elephant", "giraffe", "lion", "cheetah");

	// returns "sage. basil. oregano. pepper. parsley"
	myConcat(". ", "sage", "basil", "oregano", "pepper", "parsley");


##### 创建html lists

	function list(type) {
  		var result = "<" + type + "l><li>";
  		var args = Array.prototype.slice.call(arguments, 1);
  		result += args.join("</li><li>");
  		result += "</li></" + type + "l>"; // end list

  		return result;
	}
	var listHTML = list("u", "One", "Two", "Three");

	/* listHTML is:

	"<ul><li>One</li><li>Two</li><li>Three</li></ul>"

	*/

###解构参数，默认参数和Rest参数


没有任何参数的情况，Rest参数
	function foo(...args) {
  		return arguments;
	}
	foo(1, 2, 3); // { "0": 1, "1": 2, "2": 3 }



 形参设置默认值和不设置的情况
	function bar(a=1) { 
  		arguments[0] = 100;
  		return a;
	}
	bar(10); // 10

	function zoo(a) { 
  		arguments[0] = 100;
  		return a;
	}
	zoo(10); // 100


	// 再看一组对比
	function func(a, b) {
    	arguments[0] = 90;
    	arguments[1] = 99;
    	console.log(a + " " + b);
	}

	func(1, 2); //90, 99

	function func(a, b) {
    	a = 9;
    	b = 99;
    	console.log(arguments[0] + " " + arguments[1]);
	}

	func(3, 4); //9, 99

	function func(a, b, c=9) {
    	arguments[0] = 99;
    	arguments[1] = 98;
    	console.log(a + " " + b);
	}

	func(3, 4); //3, 4


**原因：如果解构参数、Rest参数和默认参数都没有设置的话，参数会存储最后一次修改的值，读取时读取的也是最后一次修改的值。而一旦设置了解构参数、Rest参数和默认参数中的一种，则就像设置了默认参数似的，只会读取传递的实参或默认参数值。**


### Rest参数
何为Rest参数，参见下例：

    function(a, b, ...theArgs) {
	  // ...
    }
    // 其中...theArgs就是Rest参数，从第三个参数开始到最后一个都是Rest参数数组中的值
    
与arguments的区别：

1. arguments包含了所有参数，而rest参数只包含了没有命名的参数
2. arguments是一个类数组，而rest参数是一个真正的array对象

##### 用另一种方式来获得rest参数


	// Before rest parameters, the following could be found:
	function f(a, b){
  		var args = Array.prototype.slice.call(arguments, f.length);

  		// …
	}

	// 与下面相等

	function f(a, b, ...args) {
  
	}


##### 解构参数结合Rest参数

	function f(...[a, b, c]) {
  		return a + b + c;
	}

	f(1)          // NaN (b and c are undefined)
	f(1, 2, 3)    // 6
	f(1, 2, 3, 4) // 6 (the fourth parameter is not destructured)


获取rest参数的长度


	function fun1(...theArgs) {
  		console.log(theArgs.length);
	}

	fun1();  // 0
	fun1(5); // 1
	fun1(5, 6, 7); // 3



rest参数的遍历，相当于array的遍历
	function multiply(multiplier, ...theArgs) {
  		return theArgs.map(function (element) {
    		return multiplier * element;
  		});
	}

	var arr = multiply(2, 1, 2, 3); 
	console.log(arr); // [2, 4, 6]



这个例子说明了rest参数是真正的array对象，可以使用array的方法，而arguments不是array对象，不可以使用array的方法。除非将arguments先转换成array对象。
	function sortRestArgs(...theArgs) {
  		var sortedArgs = theArgs.sort();
  		return sortedArgs;
	}

	console.log(sortRestArgs(5,3,7,1)); // shows 1,3,5,7

	function sortArguments() {
  		var sortedArgs = arguments.sort(); 
  		return sortedArgs; // this will never happen
	}

	// throws a TypeError: arguments.sort is not a function
	console.log(sortArguments(5,3,7,1));



### 默认参数(ES6新特性)
函数定义时，参数默认为undefined。可以给参数设置默认值，改变默认undefined。
从前设置默认值通过以下这样的方法来设置：

	function multiply(a, b) {
  		//这句话设置默认值
  		var b = (typeof b !== 'undefined') ?  b : 1;
  		return a*b;
	}
	multiply(5); // 5

在ES6中，只需设置一下默认参数即可：

	function multiply(a, b = 1) {
  		return a*b;
	}
	multiply(5); // 5




每次调用都是新建一份函数
	function append(value, array = []) {
  		array.push(value);
  		return array;
	}

	append(1); //[1]
	append(2); //[2], not [1, 2]



默认参数为函数
	function callSomething(thing = something()) { return thing }

	function something(){
  		return "sth";
	}

	callSomething();  //sth






默认参数可以使用前面的参数，可以进行计算
	function singularAutoPlural(singular, plural = singular+"s", rallyingCry = plural + " ATTACK!!!") {
  		return [singular, plural, rallyingCry ]; 
	}

	//["Gecko","Geckos", "Geckos ATTACK!!!"]
	singularAutoPlural("Gecko");

	//["Fox","Foxes", "Foxes ATTACK!!!"]
	//第一个和第二个参数都有了，所以只有第三个参数进行了计算
	singularAutoPlural("Fox","Foxes");

	//["Deer", "Deer", "Deer ... change."]
	singularAutoPlural("Deer", "Deer", "Deer peaceably and respectfully petition the government for positive change.")

解构参数与默认参数的结合

	function f([x, y] = [1, 2], {z: z} = {z: 3}) { 
  		return x + y + z; 
	}

	f(); // 6

一些错误的示例

	// Doesn't work! Throws ReferenceError.
	function f(a = go()) {
  		function go(){return ":P"}
	}

	function f(x=1, y) { 
  		return [x, y]; 
	}

	f(); // [1, undefined]


默认参数实现原理（）


	function go() {
  		return ":P"
	}

	function withDefaults(a, b = 5, c = b, d = go(), e = this, 
                      f = arguments, g = this.value) {
  		return [a,b,c,d,e,f,g];
	}
	function withoutDefaults(a, b, c, d, e, f, g){
  		switch(arguments.length){
    		case 0:
      		a
    		case 1:
      		b = 5
    		case 2:
      		c = b
    		case 3:
      		d = go();
    		case 4:
      		e = this
    		case 5:
      		f = arguments
    		case 6:
      		g = this.value;
    		default:
  		}
  		return [a,b,c,d,e,f,g];
	}

	withDefaults.call({value:"=^_^="});
	// [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]


	withoutDefaults.call({value:"=^_^="});
	// [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]














### 解构参数

#### 解构参数是指将array或object中的变量提取出来，变成独立有命名的变量。

	var a, b, rest;

	[a, b] = [1, 2];
	console.log(a); // 1
	console.log(b); // 2

	[a, b, ...rest] = [1, 2, 3, 4, 5];
	console.log(a); // 1
	console.log(b); // 2
	console.log(rest); // [3, 4, 5]

	({a, b} = {a:1, b:2});
	console.log(a); // 1
	console.log(b); // 2

	// ES7 - not implemented in Firefox 47a01
	({a, b, ...rest} = {a:1, b:2, c:3, d:4});

**基本使用**
<pre><code>
var foo = ["one", "two", "three"];

var [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"

</code></pre>


<pre><code>
var a, b;

[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

</code></pre>

**默认值**
<pre><code>
var a, b;

[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7
</code></pre>
	
**交换变量**
<pre><code>
var a = 1;
var b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
</code></pre>

**从函数返回的数组**
<pre><code>
function f() {
  return [1, 2];
}

var a, b; 
[a, b] = f(); 
console.log(a); // 1
console.log(b); // 2
</code></pre>

**忽略一些返回值**
<pre><code>
function f() {
  return [1, 2, 3];
}

var [a, , b] = f();
console.log(a); // 1
console.log(b); // 3

//甚至全部忽略
[,,] = f();
</code></pre>

从正则表达式返回的数据
<pre><code>
var url = "https://developer.mozilla.org/en-US/Web/JavaScript";

var parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
console.log(parsedURL); // ["https://developer.mozilla.org/en-US/Web/JavaScript", "https", "developer.mozilla.org", "en-US/Web/JavaScript"]

var [, protocol, fullhost, fullpath] = parsedURL;

console.log(protocol); // "https"
</code></pre>
<pre><code></code></pre>

####对象解构

**基本定义**

<pre><code>
var o = {p: 42, q: true};
var {p, q} = o;

console.log(p); // 42
console.log(q); // true
</code></pre>



**没有定义的分配**
<pre><code>
var a, b;

({a, b} = {a:1, b:2});
</code></pre>

**分配新的变量名**
<pre><code>
var o = {p: 42, q: true};
var {p: foo, q: bar} = o;
 
console.log(foo); // 42 
console.log(bar); // true 
</code></pre>


**默认值**
<pre><code>
var {a=10, b=5} = {a: 3};

console.log(a); // 3
console.log(b); // 5
</code></pre>


**设置一个函数参数的默认值**
<pre><code>
/***********用es5*************/
function drawES5Chart(options) {
  options = options === undefined ? {} : options;
  var size = options.size === undefined ? 'big' : options.size;
  var cords = options.cords === undefined ? { x: 0, y: 0 } : options.cords;
  var radius = options.radius === undefined ? 25 : options.radius;
  console.log(size, cords, radius);
  // now finally do some chart drawing
}

drawES5Chart({
  cords: { x: 18, y: 30 },
  radius: 30
});

/***********用es6*************/
function drawES6Chart({size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {}) {
  console.log(size, cords, radius);
  // do some chart drawing
}

// In Firefox, default values for destructuring assignments are not yet implemented (as described below). 
// The workaround is to write the parameters in the following way:
// ({size: size = 'big', cords: cords = { x: 0, y: 0 }, radius: radius = 25} = {})

drawES6Chart({
  cords: { x: 18, y: 30 },
  radius: 30
});
</code></pre>


**嵌套对象的调用**
<pre><code>
var metadata = {
    title: "Scratchpad",
    translations: [
       {
        locale: "de",
        localization_tags: [ ],
        last_edit: "2014-04-14T08:43:37",
        url: "/de/docs/Tools/Scratchpad",
        title: "JavaScript-Umgebung"
       }
    ],
    url: "/en-US/docs/Tools/Scratchpad"
};

var { title: englishTitle, translations: [{ title: localeTitle }] } = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"
</code></pre>

**对象的迭代**
<pre><code>
var people = [
  {
    name: "Mike Smith",
    family: {
      mother: "Jane Smith",
      father: "Harry Smith",
      sister: "Samantha Smith"
    },
    age: 35
  },
  {
    name: "Tom Jones",
    family: {
      mother: "Norah Jones",
      father: "Richard Jones",
      brother: "Howard Jones"
    },
    age: 25
  }
];

for (var {name: n, family: { father: f } } of people) {
  console.log("Name: " + n + ", Father: " + f);
}

// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"
</code></pre>

**传递整个对象作为参数**
<pre><code>
function userId({id}) {
  return id;
}

function whois({displayName: displayName, fullName: {firstName: name}}){
  console.log(displayName + " is " + name);
}

var user = { 
  id: 42, 
  displayName: "jdoe",
  fullName: { 
      firstName: "John",
      lastName: "Doe"
  }
};

console.log("userId: " + userId(user)); // "userId: 42"
whois(user); // "jdoe is John"
</code></pre>

**计算对象属性名并解构**
<pre><code>
let key = "z";
let { [key]: foo } = { z: "bar" };

console.log(foo); // "bar"
</code></pre>


###Arrow function
只保留参数、函数statements和返回的表达式，其他都简化了
语法
<pre><code>
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
         // 相当于:  => { return expression; }

// 只有一个参数的情况，括号是可选项 :
(singleParam) => { statements }
singleParam => { statements }

// 没有参数的时候，必须要括号:
() => { statements }


// Parenthesize the body to return an object literal expression:
params => ({foo: bar})

// 支持Rest参数，默认参数
(param1, param2, ...rest) => { statements }
(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }

支持解构参数
var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f();  // 6
</code></pre>

引入arrow function的原因
1.缩短function
<pre><code>
var a = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryl­lium"
];

var a2 = a.map(function(s){ return s.length });
//对比普通函数，arrow函数简短很多
var a3 = a.map( s => s.length );
</code></pre>

2.不需要绑定this</br>
**普通函数里一般这样写是有问题的：**
<pre><code>
function Person() {
  
  this.age = 0;

  setInterval(function growUp() {
    // 这里的this是全局变量，指代windows，而并非是所期望的Person对象
    this.age++;
  }, 1000);
}

var p = new Person();

//如果要将this指向Person对象，需要这样改动：
function Person() {
  //将this对象保存下来
  var that = this;
  that.age = 0;

  setInterval(function growUp() {
    //这里使用that,就能实现原来的期望，指代Person对象了
    
    that.age++;
  }, 1000);
}

//如果使用arrow函数，就无需再进行绑定
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| properly refers to the person object
  }, 1000);
}

var p = new Person();
</code></pre>

<pre><code>
// 空的函数体返回undefined
let empty = () => {};

(() => "foobar")() // IIFE, returns "foobar" 

var simple = a => a > 15 ? 15 : a; 
simple(16); // 15
simple(10); // 10

let max = (a, b) => a > b ? a : b;

// Easy array filtering, mapping, ...

var arr = [5, 6, 13, 0, 1, 18, 23];
var sum = arr.reduce((a, b) => a + b);  // 66
var even = arr.filter(v => v % 2 == 0); // [6, 0, 18]
var double = arr.map(v => v * 2);       // [10, 12, 26, 0, 2, 36, 46]

// More concise promise chains
promise.then(a => {
  // ...
}).then(b => {
   // ...
});


//没有花括号的返回，可以不用写return,有花括号的需要写return
var func = x => x * x;                  
var func = (x, y) => { return x + y; }; 

//返回对象，第一个花括号里的是函数体，所以以下两种情况foo会被认为是label
var func = () => {  foo: 1  };               
var func = () => {  foo: function() {}  };   
//需要再加一个花括号才是object
var func = () => ({ foo: 1 });
</code></pre>

<pre><code>
var adder = {
  base : 1,
    
  add : function(a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function(a) {
    var f = v => v + this.base;
    var b = {
      base : 2
    };
            
    return f.call(b, a);
  }
};

console.log(adder.add(1));         // This would log to 2
console.log(adder.addThruCall(1)); // This would log to 2 still
</code></pre>

没有arguments对象
<pre><code>
var arguments = 42;
var arr = () => arguments;

arr(); // 42

function foo() {
  var f = (i) => arguments[0]+i; // foo's implicit arguments binding
  return f(2);
}

foo(1); // 3

//arrow没有arguments对象，不过可以用rest参数
function foo() { 
  var f = (...args) => args[0]; 
  return f(2); 
}

foo(1); // 2
</code></pre>

<pre><code>
'use strict';
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b(); // prints undefined, Window
obj.c(); // prints 10, Object {...}

'use strict';
var obj = {
  a: 10
};

Object.defineProperty(obj, "b", {
  get: () => {
    console.log(this.a, typeof this.a, this);
    return this.a+10; // represents global object 'Window', therefore 'this.a' returns 'undefined'
  }
});

</code></pre>

解析顺序
<pre><code>
let callback;

callback = callback || function() {}; // ok
callback = callback || () => {};      // SyntaxError: invalid arrow-function arguments
callback = callback || (() => {});    // ok
</code></pre>