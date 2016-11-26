/*
第一类：类静态方法
 */
//-------------------------------------对对象进行扩展/拷贝--------------------
//Object.assign(target, ...sources)
//基本使用
var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
//深拷贝,不能使用assign方法，因为它会拷贝源对象的地址，而不是值
function test() {
    let a = { b: {c:4} , d: { e: {f:1}} }
    //g拷贝自a，且共享同一个地址
    let g = Object.assign({},a)
    //正确的深拷贝方法
    let h = JSON.parse(JSON.stringify(a));
    console.log(g.d) // { e: { f: 1 } }
    g.d.e = 32
    console.log('g.d.e set to 32.') // g.d.e set to 32.
    console.log(g) // { b: { c: 4 }, d: { e: 32 } }
    console.log(a) // { b: { c: 4 }, d: { e: 32 } }
    console.log(h) // { b: { c: 4 }, d: { e: { f: 1 } } }
    h.d.e = 54
    console.log('h.d.e set to 54.') // h.d.e set to 54.
    console.log(g) // { b: { c: 4 }, d: { e: 32 } }
    console.log(a) // { b: { c: 4 }, d: { e: 32 } }
    console.log(h) // { b: { c: 4 }, d: { e: 54 } }
}
test();
//合并对象
var o1 = { a: 1, b: 1, c: 1 };
var o2 = { b: 2, c: 2 };
var o3 = { c: 3 };

var obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }

//拷贝Symbol-typed属性
var o1 = { a: 1 };
var o2 = { [Symbol('foo')]: 2 };
var obj = Object.assign({}, o1, o2);
console.log(obj); // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
Object.getOwnPropertySymbols(obj); // [Symbol(foo)]

//原型链上的属性和非enumerable属性不能被拷贝
var obj = Object.create({ foo: 1 }, { // foo is on obj's prototype chain.
    bar: {
        value: 2  // bar is a non-enumerable property.
    },
    baz: {
        value: 3,
        enumerable: true  // baz is an own enumerable property.
    }
});
var copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }

//原始值会被对象包装
var v1 = 'abc';
var v2 = true;
var v3 = 10;
var v4 = Symbol('foo');
var obj = Object.assign({}, v1, null, v2, undefined, v3, v4);
//原始值会被包装，null and undefined会被ignored.
//注意, 只有string wrapper能有enumerable属性.所以v2,v3,v4都没有被拷贝
console.log(obj); // { "0": "a", "1": "b", "2": "c" }


//错误会打断拷贝
var target = Object.defineProperty({}, 'foo', {
    value: 1,
    writable: false
}); // target.foo is a read-only property
Object.assign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 });
// TypeError: "foo" is read-only
// The Exception is thrown when assigning target.foo
console.log(target.bar);  // 2, the first source was copied successfully.
console.log(target.foo2); // 3, the first property of the second source was copied successfully.
console.log(target.foo);  // 1, exception is thrown here.
console.log(target.foo3); // undefined, assign method has finished, foo3 will not be copied.
console.log(target.baz);  // undefined, the third source will not be copied either.

//拷贝存取器
var obj = {
    foo: 1,
    get bar() {
        return 2;
    }
};
var copy = Object.assign({}, obj);
console.log(copy);
// { foo: 1, bar: 2 }, the value of copy.bar is obj.bar's getter's return value.
// This is an assign function that copies full descriptors
function completeAssign(target, ...sources) {
    sources.forEach(source => {
        let descriptors = Object.keys(source).reduce((descriptors, key) => {
                descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
    return descriptors;
}, {});
// by default, Object.assign copies enumerable Symbols too
Object.getOwnPropertySymbols(source).forEach(sym => {
    let descriptor = Object.getOwnPropertyDescriptor(source, sym);
if (descriptor.enumerable) {
    descriptors[sym] = descriptor;
}
});
Object.defineProperties(target, descriptors);
});
return target;
}
var copy = completeAssign({}, obj);
console.log(copy);
// { foo:1, get bar() { return 2 } }

//------------------------------------------创建对象------------------------------
//Object.create(proto[, propertiesObject])
//Example:继承
// Shape - superclass
function Shape() {
    this.x = 0;
    this.y = 0;
}
// superclass method
Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
};
// Rectangle - subclass
function Rectangle() {
    Shape.call(this); // call super constructor.
}
// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
var rect = new Rectangle();
console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle);// true
console.log('Is rect an instance of Shape?', rect instanceof Shape);// true
rect.move(1, 1); // Outputs, 'Shape moved.'


//多继承
function MyClass() {
    SuperClass.call(this);
    OtherSuperClass.call(this);
}
MyClass.prototype = Object.create(SuperClass.prototype); // inherit
mixin(MyClass.prototype, OtherSuperClass.prototype); // mixin
MyClass.prototype.myMethod = function() {
    // do a thing
};


//使用 propertiesObject参数
var o;
// create an object with null as prototype
o = Object.create(null);
o = {};
// is equivalent to:
o = Object.create(Object.prototype);
// Example where we create an object with a couple of sample properties.
// (Note that the second parameter maps keys to *property descriptors*.)
o = Object.create(Object.prototype, {
    // foo is a regular 'value property'
    foo: { writable: true, configurable: true, value: 'hello' },
    // bar is a getter-and-setter (accessor) property
    bar: {
        configurable: false,
        get: function() { return 10; },
        set: function(value) { console.log('Setting `o.bar` to', value); }
        /* with ES5 Accessors our code can look like this
         get function() { return 10; },
         set function(value) { console.log('setting `o.bar` to', value); } */
    }
});
function Constructor() {}
o = new Constructor();
// is equivalent to:
o = Object.create(Constructor.prototype);
// Of course, if there is actual initialization code in the
// Constructor function, the Object.create() cannot reflect it
// Create a new object whose prototype is a new, empty object
// and add a single property 'p', with value 42.
o = Object.create({}, { p: { value: 42 } });
// by default properties ARE NOT writable, enumerable or configurable:
o.p = 24;
o.p;
// 42
o.q = 12;
for (var prop in o) {
    console.log(prop);
}
// 'q'
delete o.p;
// false
// to specify an ES3 property
o2 = Object.create({}, {
    p: {
        value: 42,
        writable: true,
        enumerable: true,
        configurable: true
    }
});

//-----------------------------------获取/设置对象的propotype---------------------
//获取：Object.getPrototypeOf(obj)
//设置：Object.setPrototypeOf(obj, prototype);会导致性能比较慢，慎用
var proto = {};
var obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true

var dict = Object.setPrototypeOf({}, null);

//追加原型链
//定义
/**
 *** Object.appendChain(@object, @prototype)
 *
 * Appends the first non-native prototype of a chain to a new prototype.
 * Returns @object (if it was a primitive value it will transformed into an object).
 *
 *** Object.appendChain(@object [, "@arg_name_1", "@arg_name_2", "@arg_name_3", "..."], "@function_body")
 *** Object.appendChain(@object [, "@arg_name_1, @arg_name_2, @arg_name_3, ..."], "@function_body")
 *
 * Appends the first non-native prototype of a chain to the native Function.prototype object, then appends a
 * new Function(["@arg"(s)], "@function_body") to that chain.
 * Returns the function.
 *
 **/

Object.appendChain = function(oChain, oProto) {
    if (arguments.length < 2) {
        throw new TypeError('Object.appendChain - Not enough arguments');
    }
    if (typeof oProto !== 'object' && typeof oProto !== 'string') {
        throw new TypeError('second argument to Object.appendChain must be an object or a string');
    }

    var oNewProto = oProto,
        oReturn = o2nd = oLast = oChain instanceof this ? oChain : new oChain.constructor(oChain);

    for (var o1st = this.getPrototypeOf(o2nd);
         o1st !== Object.prototype && o1st !== Function.prototype;
         o1st = this.getPrototypeOf(o2nd)
    ) {
        o2nd = o1st;
    }

    if (oProto.constructor === String) {
        oNewProto = Function.prototype;
        oReturn = Function.apply(null, Array.prototype.slice.call(arguments, 1));
        this.setPrototypeOf(oReturn, oLast);
    }

    this.setPrototypeOf(o2nd, oNewProto);
    return oReturn;
}
//使用
//Example1
function Mammal() {
    this.isMammal = 'yes';
}
function MammalSpecies(sMammalSpecies) {
    this.species = sMammalSpecies;
}
MammalSpecies.prototype = new Mammal();
MammalSpecies.prototype.constructor = MammalSpecies;
var oCat = new MammalSpecies('Felis');
console.log(oCat.isMammal); // 'yes'
function Animal() {
    this.breathing = 'yes';
}
Object.appendChain(oCat, new Animal());
console.log(oCat.breathing); // 'yes'

//Example2
function MySymbol() {
    this.isSymbol = 'yes';
}
var nPrime = 17;
console.log(typeof nPrime); // 'number'
var oPrime = Object.appendChain(nPrime, new MySymbol());
console.log(oPrime); // '17'
console.log(oPrime.isSymbol); // 'yes'
console.log(typeof oPrime); // 'object'

//Example3
function Person(sName) {
    this.identity = sName;
}
var george = Object.appendChain(new Person('George'), 'console.log("Hello guys!!");');
console.log(george.identity); // 'George'
george(); // 'Hello guys!!'


//-----------------------------------------------属性存取-------------------------------
//定义属性：
Object.defineProperty(obj, prop, descriptor)
Object.defineProperties(obj, props)
//获取属性描述信息
Object.getOwnPropertyDescriptor(obj, prop)
Object.getOwnPropertyDescriptors(obj)
//返回属性的key值
Object.getOwnPropertyNames(obj)
Object.keys()
//返回Symbol属性
Object.getOwnPropertySymbols(obj)

//------------------------------------------检测对象--------------------------------------
//方法：Object.isExtensible(obj)
/*
 Objects are extensible by default: they can have new properties added to them,
 and (in engines that support __proto__ their __proto__ property) can be modified.
 An object can be marked as non-extensible using Object.preventExtensions(),
 Object.seal(), or Object.freeze().
 */
// New objects are extensible.
var empty = {};
Object.isExtensible(empty); // === true
// ...but that can be changed.
Object.preventExtensions(empty);
Object.isExtensible(empty); // === false
// Sealed objects are by definition non-extensible.
var sealed = Object.seal({});
Object.isExtensible(sealed); // === false
// Frozen objects are also by definition non-extensible.
var frozen = Object.freeze({});
Object.isExtensible(frozen); // === false


//方法：Object.isFrozen(obj)
//An object is frozen if and only if it is not extensible,
// all its properties are non-configurable,
// and all its data properties (that is, properties which are not accessor
// properties with getter or setter components) are non-writable.
// A new object is extensible, so it is not frozen.
Object.isFrozen({}); // === false
// An empty object which is not extensible is vacuously frozen.
var vacuouslyFrozen = Object.preventExtensions({});
Object.isFrozen(vacuouslyFrozen); // === true
// A new object with one property is also extensible, ergo not frozen.
var oneProp = { p: 42 };
Object.isFrozen(oneProp); // === false
// Preventing extensions to the object still doesn't make it frozen,
// because the property is still configurable (and writable).
Object.preventExtensions(oneProp);
Object.isFrozen(oneProp); // === false
// ...but then deleting that property makes the object vacuously frozen.
delete oneProp.p;
Object.isFrozen(oneProp); // === true
// A non-extensible object with a non-writable but still configurable property is not frozen.
var nonWritable = { e: 'plep' };
Object.preventExtensions(nonWritable);
Object.defineProperty(nonWritable, 'e', { writable: false }); // make non-writable
Object.isFrozen(nonWritable); // === false
// Changing that property to non-configurable then makes the object frozen.
Object.defineProperty(nonWritable, 'e', { configurable: false }); // make non-configurable
Object.isFrozen(nonWritable); // === true
// A non-extensible object with a non-configurable but still writable property also isn't frozen.
var nonConfigurable = { release: 'the kraken!' };
Object.preventExtensions(nonConfigurable);
Object.defineProperty(nonConfigurable, 'release', { configurable: false });
Object.isFrozen(nonConfigurable); // === false
// Changing that property to non-writable then makes the object frozen.
Object.defineProperty(nonConfigurable, 'release', { writable: false });
Object.isFrozen(nonConfigurable); // === true
// A non-extensible object with a configurable accessor property isn't frozen.
var accessor = { get food() { return 'yum'; } };
Object.preventExtensions(accessor);
Object.isFrozen(accessor); // === false
// ...but make that property non-configurable and it becomes frozen.
Object.defineProperty(accessor, 'food', { configurable: false });
Object.isFrozen(accessor); // === true
// But the easiest way for an object to be frozen is if Object.freeze has been called on it.
var frozen = { 1: 81 };
Object.isFrozen(frozen); // === false
Object.freeze(frozen);
Object.isFrozen(frozen); // === true
// By definition, a frozen object is non-extensible.
Object.isExtensible(frozen); // === false
// Also by definition, a frozen object is sealed.
Object.isSealed(frozen); // === true

//语法：Object.isSealed(obj)
//An object is sealed if it is not extensible
// and if all its properties are non-configurable
// and therefore not removable (but not necessarily non-writable).
// Objects aren't sealed by default.
var empty = {};
Object.isSealed(empty); // === false
// If you make an empty object non-extensible, it is vacuously sealed.
Object.preventExtensions(empty);
Object.isSealed(empty); // === true
// The same is not true of a non-empty object, unless its properties are all non-configurable.
var hasProp = { fee: 'fie foe fum' };
Object.preventExtensions(hasProp);
Object.isSealed(hasProp); // === false
// But make them all non-configurable and the object becomes sealed.
Object.defineProperty(hasProp, 'fee', { configurable: false });
Object.isSealed(hasProp); // === true
// The easiest way to seal an object, of course, is Object.seal.
var sealed = {};
Object.seal(sealed);
Object.isSealed(sealed); // === true
// A sealed object is, by definition, non-extensible.
Object.isExtensible(sealed); // === false
// A sealed object might be frozen, but it doesn't have to be.
Object.isFrozen(sealed); // === true (all properties also non-writable)
var s2 = Object.seal({ p: 3 });
Object.isFrozen(s2); // === false ('p' is still writable)
var s3 = Object.seal({ get p() { return 0; } });
Object.isFrozen(s3); // === true (only configurability matters for accessor properties)

//------------------------------------------操作对象--------------------------------------
//冻结对象：other code can't delete or change any properties.
//方法：Object.freeze(obj)
var obj = {
    prop: function() {},
    foo: 'bar'
};
// New properties may be added, existing properties may be changed or removed
obj.foo = 'baz';
obj.lumpy = 'woof';
delete obj.prop;
// Both the object being passed as well as the returned object will be frozen.
// It is unnecessary to save the returned object in order to freeze the original.
var o = Object.freeze(obj);
o === obj; // true
Object.isFrozen(obj); // === true
// Now any changes will fail
obj.foo = 'quux'; // silently does nothing
obj.quaxxor = 'the friendly duck'; // silently doesn't add the property
// ...and in strict mode such attempts will throw TypeErrors
function fail(){
    'use strict';
    obj.foo = 'sparky'; // throws a TypeError
    delete obj.quaxxor; // throws a TypeError
    obj.sparky = 'arf'; // throws a TypeError
}
fail();
// Attempted changes through Object.defineProperty will also throw
Object.defineProperty(obj, 'ohai', { value: 17 }); // throws a TypeError
Object.defineProperty(obj, 'foo', { value: 'eit' }); // throws a TypeError

//Example2
obj1 = {
    internal: {}
};
Object.freeze(obj1);
obj1.internal.a = 'aValue';
obj1.internal.a // 'aValue'
// To make obj fully immutable, freeze each object in obj.
// To do so, we use this function.
function deepFreeze(obj) {

    // Retrieve the property names defined on obj
    var propNames = Object.getOwnPropertyNames(obj);

    // Freeze properties before freezing self
    propNames.forEach(function(name) {
        var prop = obj[name];

        // Freeze prop if it is an object
        if (typeof prop == 'object' && prop !== null)
            deepFreeze(prop);
    });

    // Freeze self (no-op if already frozen)
    return Object.freeze(obj);
}
obj2 = {
    internal: {}
};
deepFreeze(obj2);
obj2.internal.a = 'anotherValue';
obj2.internal.a; // undefined


//密封对象：Prevents other code from deleting properties of an object.
//preventing new properties from being added to it and marking all existing properties
// as non-configurable.
// Values of present properties can still be changed as long as they are writable.
//Object.seal(obj)
var obj = {
    prop: function() {},
    foo: 'bar'
};
// New properties may be added, existing properties may be changed or removed.
obj.foo = 'baz';
obj.lumpy = 'woof';
delete obj.prop;
var o = Object.seal(obj);
o === obj; // true
Object.isSealed(obj); // === true
// Changing property values on a sealed object still works.
obj.foo = 'quux';
// But you can't convert data properties to accessors, or vice versa.
Object.defineProperty(obj, 'foo', { get: function() { return 'g'; } }); // throws a TypeError
// Now any changes, other than to property values, will fail.
obj.quaxxor = 'the friendly duck'; // silently doesn't add the property
delete obj.foo; // silently doesn't delete the property
// ...and in strict mode such attempts will throw TypeErrors.
function fail() {
    'use strict';
    delete obj.foo; // throws a TypeError
    obj.sparky = 'arf'; // throws a TypeError
}
fail();
// Attempted additions through Object.defineProperty will also throw.
Object.defineProperty(obj, 'ohai', { value: 17 }); // throws a TypeError
Object.defineProperty(obj, 'foo', { value: 'eit' }); // changes existing property value

//阻止对象可扩展
// prevents new properties from ever being added to an object (i.e. prevents future extensions to the object).
Object.preventExtensions(obj)
// Object.preventExtensions returns the object being made non-extensible.
var obj = {};
var obj2 = Object.preventExtensions(obj);
obj === obj2; // true
// Objects are extensible by default.
var empty = {};
Object.isExtensible(empty); // === true
// ...but that can be changed.
Object.preventExtensions(empty);
Object.isExtensible(empty); // === false
// Object.defineProperty throws when adding a new property to a non-extensible object.
var nonExtensible = { removable: true };
Object.preventExtensions(nonExtensible);
Object.defineProperty(nonExtensible, 'new', { value: 8675309 }); // throws a TypeError
// In strict mode, attempting to add new properties to a non-extensible object throws a TypeError.
function fail() {
    'use strict';
    nonExtensible.newProperty = 'FAIL'; // throws a TypeError
}
fail();
// EXTENSION (only works in engines supporting __proto__
// (which is deprecated. Use Object.getPrototypeOf instead)):
// A non-extensible object's prototype is immutable.
var fixed = Object.preventExtensions({});
fixed.__proto__ = { oh: 'hai' }; // throws a TypeError


//比较
//Object.is(value1, value2);
/*Object.is() determines whether two values are the same value. Two values are the same if one of the following holds:

    both undefined
both null
both true or both false
both strings of the same length with the same characters
both the same object
both numbers and
both +0
both -0
both NaN
or both non-zero and both not NaN and both have the same value

This is not the same as being equal according to the == operator. The == operator applies various coercions to both sides (if they are not the same Type) before testing for equality (resulting in such behavior as "" == false being true), but Object.is doesn't coerce either value.

This is also not the same as being equal according to the === operator. The === operator (and the == operator as well) treats the number values -0 and +0 as equal and treats Number.NaN as not equal to NaN.
    */
Object.is('foo', 'foo');     // true
Object.is(window, window);   // true

Object.is('foo', 'bar');     // false
Object.is([], []);           // false

var test = { a: 1 };
Object.is(test, test);       // true

Object.is(null, null);       // true

// Special Cases
Object.is(0, -0);            // false
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true


//=========================Prototype的方法=========================================
//1.是否有某属性：obj.hasOwnProperty(prop)
o = new Object();
o.prop = 'exists';
function changeO() {
    o.newprop = o.prop;
    delete o.prop;
}
o.hasOwnProperty('prop');   // returns true
changeO();
o.hasOwnProperty('prop');   // returns false

//direct properties和继承自原型链properties的区别
o = new Object();
o.prop = 'exists';
o.hasOwnProperty('prop');             // returns true
o.hasOwnProperty('toString');         // returns false
o.hasOwnProperty('hasOwnProperty');   // returns false

//迭代属性
var buz = {
    fog: 'stack'
};
for (var name in buz) {
    if (buz.hasOwnProperty(name)) {
        console.log('this is fog (' + name + ') for sure. Value: ' + buz[name]);
    }
    else {
        console.log(name); // toString or something else
    }
}

//使用hasOwnProperty作为属性
var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons'
};
foo.hasOwnProperty('bar'); // always returns false
// Use another Object's hasOwnProperty and call it with 'this' set to foo
({}).hasOwnProperty.call(foo, 'bar'); // true
// It's also possible to use the hasOwnProperty property from the Object prototype for this purpose
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true


//2.方法名：prototypeObj.isPrototypeOf(object)
//tests for an object in another object's prototype chain.
function Fee() {
    // ...
}
function Fi() {
    // ...
}
Fi.prototype = new Fee();
function Fo() {
    // ...
}
Fo.prototype = new Fi();
function Fum() {
    // ...
}
Fum.prototype = new Fo();
var fum = new Fum();
// ...
if (Fi.prototype.isPrototypeOf(fum)) {
    // do something safe
}

//3.方法名：obj.propertyIsEnumerable(prop)
//whether the specified property is enumerable.
var o = {};
var a = [];
o.prop = 'is enumerable';
a[0] = 'is enumerable';
o.propertyIsEnumerable('prop');   // returns true
a.propertyIsEnumerable(0);        // returns true

//内置属性和一般属性的区别
var a = ['is enumerable'];
a.propertyIsEnumerable(0);          // returns true
a.propertyIsEnumerable('length');   // returns false
Math.propertyIsEnumerable('random');   // returns false
this.propertyIsEnumerable('Math');     // returns false

//继承属性和一般属性的区别
var a = [];
a.propertyIsEnumerable('constructor');         // returns false

function firstConstructor() {
    this.property = 'is not enumerable';
}

firstConstructor.prototype.firstMethod = function() {};

function secondConstructor() {
    this.method = function method() { return 'is enumerable'; };
}

secondConstructor.prototype = new firstConstructor;
secondConstructor.prototype.constructor = secondConstructor;

var o = new secondConstructor();
o.arbitraryProperty = 'is enumerable';

o.propertyIsEnumerable('arbitraryProperty');   // returns true
o.propertyIsEnumerable('method');              // returns true
o.propertyIsEnumerable('property');            // returns false

o.property = 'is enumerable';

o.propertyIsEnumerable('property');            // returns true

// These return false as they are on the prototype which
// propertyIsEnumerable does not consider (even though the last two
// are iteratable with for-in)
o.propertyIsEnumerable('prototype');   // returns false (as of JS 1.8.1/FF3.6)
o.propertyIsEnumerable('constructor'); // returns false
o.propertyIsEnumerable('firstMethod'); // returns false


//=========================ToString类的方法====================================
//方法名：obj.toString()，obj.toLocaleString();
/*
 Every object has a toString() method that is automatically called when the object is to be represented as a text value or when an object is referred to in a manner in which a string is expected. By default, the toString() method is inherited by every object descended from Object. If this method is not overridden in a custom object, toString() returns "[object type]", where type is the object type. The following code illustrates this:
 */
var o = new Object();
o.toString(); // returns [object Object]

//覆盖原来的toString方法
function Dog(name, breed, color, sex) {
    this.name = name;
    this.breed = breed;
    this.color = color;
    this.sex = sex;
}
theDog = new Dog('Gabby', 'Lab', 'chocolate', 'female');
theDog.toString(); // returns [object Object]
Dog.prototype.toString = function dogToString() {
    var ret = 'Dog ' + this.name + ' is a ' + this.sex + ' ' + this.color + ' ' + this.breed;
    return ret;
}//"Dog Gabby is a female chocolate Lab"

//用来检测对象类型
var toString = Object.prototype.toString;
toString.call(new Date);    // [object Date]
toString.call(new String);  // [object String]
toString.call(Math);        // [object Math]
// Since JavaScript 1.8.5
toString.call(undefined);   // [object Undefined]
toString.call(null);        // [object Null]





//obj.valueOf()
//returns the primitive value of the specified object.
function myNumberType(n) {
    this.number = n;
}
myNumberType.prototype.valueOf = function() {
    return this.number;
};
myObj = new myNumberType(4);
myObj + 3; // 7