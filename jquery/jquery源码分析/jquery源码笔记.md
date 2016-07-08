1.(21，94)--定义了一些变量和函数jQuery = function(){};     

2.(96,283)给JQ对象，添加一些方法和属性    

3.(285,347)extend：JQ继承方法  

4.(349,817)jQuery.extend():扩展一些工具方法

【几大模块：Callback对象，Defer对象，功能检测，数据缓存，队列管理】

5.(877,2856)---Sizzle 复杂选择器的实现　例如：$("ul li.c");

6.(3095,3223)---Callbacks：回调对象，通过回调对象管理函数，函数的统一管理方法。
function fn1(){alert(1);}
function fn2(alert(2));
var cb = $.Callbacks();
cb.add(fn1);
cb.add(fn2);
cb.fire();//1,2
cb.remove(fn2);
cb.fire();//1

7.(3226,3366)--Deferred延迟对象，对异步的统一管理(创建script,dom加载，ajax，延迟函数)
setTimeout(function (){
alert(1);
},1000);
alert(2);
定时器是异步的，在定时器在执行的时候，不会影响后续代码的执行，先弹出2，后弹出1;
var def = $.Deferred();
setTimeout(function (){
def.resolve();
alert(1);
},1000);
def.done(function(){
alert(2);
});
先弹1，后弹2；通过延迟对象，保持一定的顺序。
延迟对象是根据回调进行的，先存，然后在回调。

8.(3184,3295):support:功能检测：
大部分的浏览器checkbox的checked都是on，但是老版本的是空，这样检测。

9.(3308,3652):data()方法的功能：数据缓存
$("#div1").data('name',"hello");
$("#div1").data("name");//hello
并没有扩展到元素身上。如果扩展到对象上，会出现内存泄漏问题。避免大数据量的数据添加到元素身上，导致内存泄漏

10.(3653,3797):queue-队列管理(入队) dequeue(出队)
$("#div2").animate({left:100});
$("#div").animate({top:100});
先把他们两个先存在队列中，执行完一个，在调用出队方法。

11.(3803,4299):attr(),prop(),val(),addClass()等：对元素属性的操作。


12.(4300,5128):on(),trigger():事件操作相关方法。
13.(5140,6057):DOM操作，添加，删除，获取，包装等等。DOM筛选……
14.(6058,6620):css()方法，专门针对样式的操作。
15.(6621,7854):提交的数据和ajax的操作-ajax,load,getJSON
16.(7855,8585):animate,运动方法，show,hide,fadeIn,fadeOut等等。
17.(8585,8792):offset,scrollTop,位置与尺寸的方法


18.(8804,8821):JQ支持模块化的一个模式，不仅支持amd的，还可以支持commonjs
19.(8826)：window.jQuery = window.$ =jQuery 对外提供的接口




1.(function(window, undefined){})();

1.1 将window以参数形式传入
1.1.1 函数使用window时查找速度更快
1.1.2 压缩时，局部变量名短，压缩效率更高

1.2 将undefined以参数形式定义
1.2.1 undefined只是window下的一个属性，在某些浏览器下（如IE7,8），undefined的值可被修改。jQuery为了防止undefined在外部被修改，所以定义了一个局部undefined参数。

2."use strict"
2.1 将Javascript模式改成 '严格模式'
2.1.1 jQuery不推荐使用
2.1.2 在ASP.NET 环境下，arguments.caller.callee 不能使用。
2.1.3 在 Firefox 18+ 以前的版本，会出现 '假死' 状态
2.1.4 在 jQuery Bugs 的 #13335 可找到更详细的相关信息

3. rootjQuery
3.1 一个赋值为jQuery(document)的变量。
3.1.1 为了后期代码压缩
3.1.2 增加代码的可阅读性（可维护性）

4.readyList
4.1 与DOM加载相关的变量（后面教程再详细说明）

5.core_strundefined = typeof undefined
5.1 存储 typeof undefined
5.1.1 在 XML.node 下，在某些浏览器（IE 6 7 8 9）下直接使用 undefined 进行判断会不支持，需要进行 typeof undefined 进行判断






1. location = window.location,
document = window.document,
docElem = document.documentElement
1.1 将2个BOM和1个DOM的常用属性以 变量 形式存储，目的是为了后期压缩效率 和 增加代码的可读性

2. _jQuery = window.jQuery,
_$ = window.$
2.2 由于其他的Javascript库有可能也使用 $ 或者定义了 jQuery 这两个变量。所以将他们以 _$, _jQuery 保存起来。目的是为了 防冲突（在后面 扩展工具方法再详细说明）

3. class2type = {}
3.1 $.type() 需要使用到这个变量
3.1.1 class2type = { '[Object String]' : 'string' , '[Object Array]' : 'array'} 日后存储此格式内容。

4. core_deletedIds = []
4.1 数据缓存相关的变量（在2.0版本前），现在仅是一个空数组

5. core_version = "2.0.3"
5.1 存储 jquery 的版本号

6. core_concat = core_deletedIds.concat,
core_push = core_deletedIds.push,
core_slice = core_deletedIds.slice,
core_indexOf = core_deletedIds.indexOf,
core_toString = class2type.toString,
core_hasOwn = class2type.hasOwnProperty,
core_trim = core_version.trim
6.1 将数组操作的常用函数以 变量 形式存储起来，增加压缩效率 和 扩展可阅读性。

7. jQuery = function( selector, context ) {
return new jQuery.fn.init( selector, context, rootjQuery );
}
7.1 每当执行 jQuery 函数，就会返回一个执行完毕的 jQuery 对象。
7.1.1 function jQuery(){
return new JQuery.prototype.init();
}
jQuery.prototype.init = function(){};
jQuery.prototypr.css = function(){};
jQuery.prototype.init.prototype = jQuery.prototype;

jQuery().css();

上面的是jQuery 面向对象 的写法。
1. 执行 jQuery 函数时，返回 jQuery 初始化对象
2. 将 jQuery.prototype 的引用 赋值 给 jQuery.init.prototype
3. 这样当 jQuery 对象生成时，就可直接使用其prototype的方法。如 jQuery().css() 。 （是否可理解成链式操作的第一步实现？有待后续教程是否解答）



第14集

jQuery.extend = jQuery.fn.extend = function () {
    定义一些变量
    
    if(){}  看是不是深拷贝情况
    
    if(){} 看参数正确否
    
    if(){} 看是不是插件情况
    
    for(){ 可能有多个对象情况
    
        if(){} 防止循环引用
        
        if(){} 深拷贝
        
        else if(){} 浅拷贝
     }
};





正则表达式：
1.core_pnum 匹配数字，正数负数，小数，科学计数法等，主要用于css方法匹配

2.rquickExpr=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/
2.1(?:\s*(<[\w\W]+>) 这个主要是匹配标签形式
2.2#([\w-]*) 这个是匹配id的形式
2.3这样写可以防止XSS木马注入
2.4如： <p>aaa 或者是 #div1

3.rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
3.1匹配独立的空标签，如：<p></p> 这种成对的标签

4.rmsPrefix = /^-ms-/
4.1用于厂商前缀，如果是：
-webkit-margin-left : 在js里面转成 webkitMarginLeft
但是IE下比较特殊：
-ms-margin-left: 在js里面首字母m必须要大写MsMarginLeft才行。

5.rdashAlpha=/-([\da-z])/gi
5.1找“-”后面的第一个字母，把它转大小写
5.2找“-”后面的第一个数字，则把“-”去掉
如：-2d, 转为 2d

6.fcamelCase = function(all, letter) {
return letter.toUpperCase();
}
6.1这个就是转驼峰写法的回调函数

7.completed = function(){
...
};
7.1这个是DOM加载成功时触发的回调函数





constructor：jquery
js源码中，当一个函数创建完后，就自动在它原型下面添加constructor这个属性，对应的就是这个构造函数：
function Aaa(){};
Aaa.prototype.constructor 对应的就是 Aaa;
以上是js源码中自动生成的。

Aaa.prototype.name = 'hello';
Aaa.prototype.age = 30;
以上两行进行的添加操作，因此Aaa.prototype.constructor不受影响，对应的仍是Aaa

但是如果写成：
Aaa.prototype = {
name: 'hello',
age: 30
}
这其实是一个覆盖操作，因此原来的Aaa.prototype.constructor就被覆盖了没有了，因此这时候Aaa.prototype.constructor对应的就不是Aaa这个构造函数了，而是object(){}

为了修正constructor这个指向，因此在jQuery当中添加了constructor: jQuery

就比如说，写成：
Aaa.prototype = {
constructor: Aaa,
name = 'hello',
age = 30
}
这样Aaa.prototype.constructor就不会被修改了，一直保持Aaa了。

因此在jQuery.fn=jQuery.prototype = {
}中，添了一行constructor: jQuery，防止构造函数被覆盖

init: function(selector, context, rootjQuery)
1.selector参数表示选择器，可以包含多种，如：
1.1 string类型的,id、class、标签选择器、创建标签，$('#ss'),$('.class'),$('div'),$('<li>')  对应：typeof selector === "string"
1.2 DOM类型的，$(document)，$(this)   对应：selector.nodeType
1.3 函数类型的，$(function(){})。      对应：jQuery.isFunction( selector )
1.4 数组、JSON形式等，$([])。          对应：jQuery.makeArray( selector, this )



第八集

假设页面有3个li，通过$('li').css('background','red'); 把三个li的背景颜色设为红色，jQuery中是如何解析的：
1.$('li')相当于JS中的：
var aLi = document.getElementByTagName('li');
2.css('background','red')相当于JS中的：
for(var i=0;i<aLi.length;i++){
aLi[i].style.background = 'red';
}
3.但是aLi只是个局部变量，如何在两个函数中使用呢，jQuery中是这样做的：
this是该对象，是共用的，$('li')对象内部是这样存放：
this = {
0 : 'li',
1 : 'li',
2 : 'li',
length : 3
}
当然this中还有其他属性，css('background','red')方法是这样解析：
for(var i=0;i<this.length;i++){
this[i].style.background = 'red';
}

所以这样写也可以，把中间的li变成红色背景：
$('li')[1].style.background = 'red';



第九集

对jQuery源码逐行解读---------创建标签

## 对jQuery源码逐行解读---------创建标签

#### $("li",docuemnt)

源码:

context = context instanceof jQuery ? context[0] : context;/*如果是jQ对象,它的context[0],就是他的原生dom文档*/
// scripts is true for back-compat
jQuery.merge( this,jQuery.parseHTML(match[1],context && context.nodeType ? context.ownerDocument || context : document,true) );

这个方法虽然看起来没有什么的用,因为创建的dom元素和在哪里创建没有什么关系. 但是编写一个浏览器插件可能有用,因为要跨文档,或者是操作xml
p.s. 这个方法找元素的话,我也用过,不过看过jQ的源码发现,并不必直接用id操作快


解读对象:

// scripts is true for back-compat
jQuery.merge( this, jQuery.parseHTML(
match[1],
context && context.nodeType ? context.ownerDocument || context : document,
true
) );

#### jQuery.parseHTML

jQuery.parseHTML(StrHtml,document,true);
i.e.
jQuery.parseHTML("<li>1</li><li>2</li><li>3</li><script> alert(1) <\/script>",document,true);
tip:
1 </script>在文档中必须成对对象,不论在string中还是其他地方???(描述有误) 这里需要转义一下
2 这个的第三个参数,是是否加载script标签,jQuery默认是false

#### jQuery.merge
可以合并数组,也可以合成json对象
I.E.


var json = {
0:1,
1:2,
length:2
}
var arr = [3,4];
$.merge(json,arr);
//output:
Object {0: 1, 1: 2, 2: 3, 3: 4, length: 4}
tip:这里的length也发生的改变,用这个方法可以很好把js对象,基本类型 合并成jQuery对象,即模拟数组

#### $("li",{title:"test",html:"1"}); 使用不多

源码:


// HANDLE: $(html, props)
if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
for ( match in context ) {//对context进行 for-in循环
//
if ( jQuery.isFunction( this[ match ] ) )
// 这里的match,难道是因为以后不会再用match变量?
{this[ match ]( context[ match ] );//执行jQuery的方法
// ...and otherwise set as attributes
} else {
this.attr( match, context[ match ] );//设置属性
}
}
}

I.E.
$("a",{ title:"test",html:"hello world"});




第十集

jQuery逐行源码-----selector 复杂的选择器
## jQuery逐行源码-----selector 复杂的选择器
#### 处理#ID


if ( typeof selector === "string" ) {

if ( match[1] ) {
....处理标签
// HANDLE: $(#id)
} else {
elem = document.getElementById( match[2] );
// Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document #6963
if ( elem && elem.parentNode ) { // Inject the element directly into the jQuery object
this.length = 1;
this[0] = elem;
}
this.context = document;
this.selector = selector;
return this;
}


**分析**:
1 if ( elem && elem.parentNode )
处理黑莓系统的bug,在黑莓4.6下,克隆dom并且还未添加到页面中,通过getElementById方法可以找到,这时候需要判断父级是否存在

2 this.length = 1; this[0] = elem;
jQ模拟对象,伪装数组.添加length,this[0],对应原生dom

if ( match && (match[1] || !context) ) {
.....处理标签和#Id
// HANDLE: $(expr, $(...))
} else if ( !context || context.jquery ) {
return ( context || rootjQuery ).find( selector );
// HANDLE: $(expr, context)
// (which is just equivalent to: $(context).find(expr)
} else {
return this.constructor( context ).find( selector );
}

tip:
1. rootjQuery就是$(document),find->sizzle。
2. context.jquery 判断是否是jQuery对象,jquery属性书jQuery的版本号
3. this.constructor
4. 指向jQuery的构造函数,所以jQuery('ul',document)就会转变成$('ul',jQuery(document)),
5.if ( !context || context.jquery ) {
return ( context || rootjQuery ).find( selector );


###小结
复杂结构的selector 就是调用的find方法:
如果有context上下文,并且是jQuery对象,用find方法,如果不是jQuery对象,就把context构造成为jQuery对象,
如果没有context上下文(也就一定不是jQuery对象)就直接用find方法。


jQuery继承
