Object 

对象可以用3种方式初始化

1. new Object()
2. Object.create()
3. {}

{}方式的语法：
<pre><code>
var o = {};
var o = { a: "foo", b: 42, c: {} };

var a = "foo", b = 42, c = {};
var o = { a: a, b: b, c: c };

//方法定义
var o = {
  property: function ([parameters]) {},
  get property() {},
  set property(value) {},
};
</code></pre>

ES6中新的命名方法
<pre><code>
// Shorthand property names (ES6)
var a = "foo", b = 42, c = {};
var o = { a, b, c };

// Shorthand method names (ES6)
var o = {
  property([parameters]) {},
  get property() {},
  set property(value) {},
  * generator() {}
};

// Computed property names (ES6)
var prop = "foo";
var o = {
  [prop]: "hey",
  ["b" + "ar"]: "there",
};
</code></pre>

Object的prototype值，其实不太理解
<pre><code>
var obj1 = {};
assert(Object.getPrototypeOf(obj1) === Object.prototype);

var obj2 = { __proto__: null };
assert(Object.getPrototypeOf(obj2) === null);

var protoObj = {};
var obj3 = { "__proto__": protoObj };
assert(Object.getPrototypeOf(obj3) === protoObj);

var obj4 = { __proto__: "not an object or null" };
assert(Object.getPrototypeOf(obj4) === Object.prototype);
assert(!obj4.hasOwnProperty("__proto__"));


var __proto__ = "variable";

var obj1 = { __proto__ };
assert(Object.getPrototypeOf(obj1) === Object.prototype);
assert(obj1.hasOwnProperty("__proto__"));
assert(obj1.__proto__ === "variable");

var obj2 = { __proto__() { return "hello"; } };
assert(obj2.__proto__() === "hello");

var obj3 = { ["__prot" + "o__"]: 17 };
assert(obj3.__proto__ === 17);
</code></pre>

####object字面量 VS JSON
1. JSON主要是用于数据交互，所以只能有属性不能有方法，且属性的类型仅限于strings, numbers, arrays, boolean, null或另一个json对象。
2. 而object字面量没有这方面的限制，既可以有属性，也可以有方法。虽然两者看起来都是花括号的形式。