/********************************************************************************************************************************/

$(document).ready(function(){
	$("#clicky").click(function(){
		var element=this;
		$(element).addClass('clicked');
		setTimeout(function(){
			console.log(this);//这里是window对象
			$(element).removeClass('clicked');	//使用闭包解决了this的引用问题		
		},1000);
	})
});
/********************************************************************************************************************************/
//如果一个方法被多个事件用到，或者在一加载完页面就要用到,避免重复写方法体的Solution
$(document).ready(function(){
	//方式一
	//绑定多个事件
	$("#country").bind('click mouseover',function(){
		alert('aa');
	})
	//页面一加载完就用到
	.trigger('click');
	
	//方式二：
	function alertMsg(){
		alert('aaa');
	}
	alertMsg();
	$("#country").bind('click mouseover',alertMsg);
})
/********************************************************************************************************************************/
//chain的格式化
//1.点在前面
//2.换一个set的元素就用缩进
$('#box')
	.addClass('contentBox')
	.children(':header')
		.addClass('contentTitle')
		.click(function() {
			$(this).siblings('.contentBody').toggle();
		})
	.end()
	.children(':not(.contentTitle)')
		.addClass('contentBody')
	.end()
	.append('<div class="contentFooter"></div>')
	.children('.contentFooter')
		.text('generated content');
/********************************************************************************************************************************/
//创建自定义的方法
/*
 * The composer Igor Stravinsky is reported to have said, “Good composers borrow; great
composers steal.” He apparently stole the quote from T.S. Eliot, who wrote, “Immature
poets imitate; mature poets steal.”
 */
jQuery.fn.radioClass = function( cls ) {
	return this // Start chain, will return its result
		.siblings() // Select all siblings of selected elements
			.removeClass(cls) // Remove class from those siblings
		.end() // Go back to original selection
		.addClass(cls); // Add class to selected elements
};
/*
 * jQuery.fn is a reference to the same object as jQuery.prototype. When you add a function
to the jQuery.fn object, you’re really adding it to jQuery.prototype.
When you create a jQuery object with jQuery() or $(), you’re actually calling new
jQuery(). (The jQuery code automatically does the new for you.) As with any other
JavaScript constructor, jQuery.prototype provides methods and default properties for
the objects returned by each new jQuery() call. So, what you’re really doing when you
write a jQuery.fn plugin is traditional object-oriented JavaScript programming, adding
a method to an object using the constructor’s prototype.
 */
/********************************************************************************************************************************/
//创建自定义的迭代器
/*
 * 迭代器的原理——each方法的实现原理：对于一个数组，一个一个元素循环一遍，循环的条件是：
 * i<array.length,且callback方法返回不绝对等于false
 */
jQuery.each = function( object, callback ) {
	for(var i = 0, length = object.length;i < length;++i) {
		var value = object[i];
		if( callback.call( value, i, value ) === false )
			break;
	}
	return object;
};
//另一种写法,超简便
jQuery.each=function(object,callback){
	for(var i=0,value=object[0],length=object.length;i<length && callback(value, i, value)!==false;value=object[++i])
	{}
}

//自定义1：倒序迭代
jQuery.fn.reverseEach=function(callback){
	for(var i=this.length,value;--i>0;){
		value=this[i];
		if( callback.call( value, i, value ) === false )
			break;
	}
	return this;
}
$('a').reverseEach(function(){
	console.log($(this).attr('href'));
})
//自定义2：间隔迭代，迭代之间间隔一会儿
//由于js中没有sleep方法，即
//doSomething();
//sleep( 1000 );
//doSomethingLater();
//所以要使用setTimeOut(function,interval)方法，即过一段interval的时间执行function
jQuery.slowEach=function(array,interval,callback){
	if(!array.length)return;
	var i=0;
	next();
	function next(){
		//这里是callback函数的调用处
		if(callback(array[i],i,array[i])!==false)
			if(++i<array.length)
				setTimeout(next,interval);
	}
	return array;
}
jQuery.fn.slowEach=function(interval,callback){	
	return jQuery.slowEach(this,interval,callback);
};
$('a').slowEach(1000,
                //这里是callback函数的定义处
                function(item,index){
				    if(index==2){
						return false;
					}
					console.log($(item).attr('href'))
				}
			)

/********************************************************************************************************************************/			
//toggle attribute:比如checkbox,原来勾上的去掉勾，原来没勾上的勾上。也可以自己设置值
//要点是：如果on的值设置好，那么直接根据on的值来设置，如果没有设置好，那么获取当前该属性值，并取反，设回到该属性上。
//eg:toggle check
jQuery.fn.toggleCheck=function(on){
	return (on!==undefined)?this.attr('checked',on):this.each(function(i,item){
		var $element=$(item);
		console.log($element)
		$element.attr('checked',!(($element.attr('checked')===undefined)?false:$element.attr('checked')));
	})
}
$('input[type="checkbox"]').toggleCheck();

//如果做得更通用一点：
jQuery.fn.toggleAttr = function( name, onValue, offValue, on ) {
	function set( $element, on ) {
		//on的传值：
		//来源一：直接传入
		//来源二：通过当前值与onValue的比较结果，是相等还是不等，这个结果一定是true/false		
		var value = on ? onValue : offValue;
		//如果value设为了null,则移除该属性，其他情况正常设置
		return value == null ?
			$element.removeAttr( name ) :
			$element.attr( name, value );
	}
	console.log(on !== undefined);
	return on !== undefined ?
		//on如果有值，调用set方法将on的值赋给元素
		set( this, on ) :
		//on如果为undefined,也是调用set方法赋值，赋值的内容是：将目前属性值与onValue做否定的asset判断
		//如果不等于onValue,则判断下来的结果是:true,那么设值为true;
		//如果等于onValue,则判断下来的结果是false,那么就为false
			this.each( function( i, element ) {
				var $element = $(element);
				set( $element, $element.attr(name) !== onValue );
		});
	};
//应用于check:
jQuery.fn.toggleCheck = function( check ) {	
	return this.toggleAttr( 'checked', 'checked', false, check );
};
$('input[type="checkbox"]').toggleCheck(true);
$('input[type="checkbox"]').toggleCheck(false);
$('input[type="checkbox"]').toggleCheck();
$('input[type="checkbox"]').each(function(i,item){
	console.log($(item).attr('checked'));
})
//应用于disabled
jQuery.fn.toggleEnable = function( enable ) {
	return this.toggleAttr( 'disabled', false, true, enable );
};
//应用于一般属性
jQuery.fn.toggleFoo = function( add ) {
	return this.toggleAttr( 'foo', 'bar', null, add );
};
//如果foo为bar,则去掉，如果不为bar或者没有foo值，加上这个值
//$('input[type="checkbox"]').toggleFoo();

$('input[type="checkbox"]').toggleFoo(null);
$('input[type="checkbox"]').each(function(i,item){
	console.log($(item).attr('foo'));
})

/*************************************************************************************************/
//设置profiler（效能\性能评测器）来查找瓶颈
//Firebug has one,
//and others are built into IE 8 and Safari 4. These are all function profilers: you start
//profiling, interact with your page, and stop profiling, and then you get a report showing
//how much time was spent in each function.
//以上说的一些是函数级别的profiler
//还有一些是用来测试selector的profiler
//真正细节的profiler还是需要自己来实现
var t1=+new Date;
//do some stuff...
var t2=+new Date;
这里+new Date,new Date是创建Date对象，+是将Date对象转换为number类型，The
way JavaScript converts an object to a number is by calling the object’s
.valueOf() method. And the .valueOf() method for a Date
object happens to be the same thing as .getTime(), giving the time in
milliseconds.
方法思路：取得当前时间，seconds为当前时间减去since(如果传入since值）或者last(没有传参数，默认为上次调用这个方法的时间）之后得出的秒数，
将其放入log数组中，并记录当下时间给last。在调用time.done的时候将其赋值到传入的selector的HTML元素上
(function() {
	var log = [], first, last;
	time = function( message, since ) {
		var now = +new Date;
		var seconds = ( now - ( since || last ) ) / 1000;
		log.push( seconds.toFixed(3) + ': ' + message + '<br />' );
		return last = +new Date;
	};
	
	time.done = function( selector ) {
	time( 'total', first );
	$(selector).html( log.join('') );
	};
	//从这里开始已经计时，time.done中的first就是这里记录下的时间，这里也是第一个last的时间
	first = last = +new Date;	
	//定义时已经执行了一次，为什么要这么做呢？
    //因为这样可以把这些变量包起来，不让其变成全局变量，而如果不执行的话，
	//那么就一定需要调用这个方法时那些赋值才可以执行，不然一开始那些变量就不赋值，所以需要包在一个匿名方法里，并执行一遍
})();

// do stuff
//以上做了一些操作，之后的time记录下这之间的时间，也就是time( 'first' )
time( 'first' );
$("a");
time( 'second' );//这里是第二段的时间
// and more
time( 'third' );
time.done( '#log' );

//Firebug开着有时会影响程序的速度，比如：
//JavaScript’s eval()
/*function, which jQuery 1.3.2 and earlier use to evaluate downloaded
JSON data, is affected to an extreme degree: an array of 10,000 names
and addresses in the format from Recipe 5.11 takes 0.2 seconds in Firefox
normally, but 55 seconds with Firebug’s Script panel enabled. Later
versions of jQuery use Function() for this, which isn’t affected by
Firebug.*/
//如果firebug影响页面速度，你也找不到什么方法来解决，可以提示用户将firebug面板关闭
$(document).ready( function() {
if( window.console && console.firebug )
$('#firebugWarning').show();
});

/***********************************************************************************************/
//避免在循环中都要使用选择器，将选择器选择出来的东西缓存起来
//方法：在循环之前将选择出来的内容保存在变量中
//eg：
var
	$clientX = $('.clientX'),
	$clientY = $('.clientY'),
	$pageX = $('.pageX'),
	$pageY = $('.pageY'),
	$screenX = $('.screenX'),
	$screenY = $('.screenY');
//这里的mousemove相当于一个循环，如果将$()操作写在里面就会导致大量的重复选择
$('html').mousemove( function( event ) {
	$clientX.html( event.clientX );
	$clientY.html( event.clientY );
	$pageX.html( event.pageX );
	$pageY.html( event.pageY );
	$screenX.html( event.screenX );
	$screenY.html( event.screenY );
});
/*一个优化代码的方法是：
One of the classic ways to optimize code is to “hoist” repeated calculations out of a
loop so you have to do them only once.Any values that don’t change inside the loop
should be calculated one time, before the loop starts. If those are expensive calculations,
the loop will then be much faster.*/
//将重复的计算提取到循环之外
/*when the “loop” is a series of frequently fired events such as
mousemove and the “calculation” is a jQuery selector. Hoisting the selector out of the
event handler makes the event handler respond faster.
 */
//当然如果循环是指一个经常触发的事件，比如mousemove，计算是指jQuery的selector,这个原则也同样适用。
/********************************************************************************************/
//写更快的selector
//1.ID比class快
//2.如果一定要使用class,那么就尽可能指定完整的路径，用ID来指定parent,比如：
/*<table id="log">
<tr><td>Client X:</td><td id="clientX"></td></tr>
...
</table>
you could use this:
$('.clientX') // Slower
$('td.clientX') // May be faster
$('#log .clientX') // May be much faster
$('#log td.clientX') // Possibly faster in some browsers*/
//在简单的页面，也许这种优化体现不出来，甚至比简单的selector更慢，因为建立selector也需要花时间，越是复杂的时间越长。
//但是在复杂的页面就能体现出来了
/*
class selectors are slow in IE 7 when you have a complex page.
If you can use it, selecting by ID as in $('#myid') is generally very fast in all browsers,
because it simply uses a single call to the getElementById() API.
It also helps to narrow down the number of elements that need to be searched, either
by specifying a parent element, by making the class selector more specific with a tag
name, or by combining those and other tricks.
 */

	
	

/******************************************************************************************/
//更快地插入表格数据
function esc( text ) {
	return text
	.replace( '&', '&amp;' )
	.replace( '<', '&lt;' )
	.replace( '>', '&gt;' );
}
$(document).ready( function() {
	function fillTable( names ) {
		$.each( names, function() {
			$('<tr>')
				.append( $('<td>').addClass('name').html(
					esc(this.first) + ' ' + esc(this.last)
				) )
				.append( $('<td>').addClass('address').html(
					esc(this.street) + '<br />' +
					esc(this.city) + ', ' +
					esc(this.state) + ' ' + esc(this.zip)
				) )
				.appendTo('#nameTable');
		});
	}
	$.getJSON( 'names-1000.json', function( json ) {
		fillTable( json.names );
	});
});
//这段代码没有问题，但是执行太慢了
/*解决方法：Combine several optimizations:
• Insert a single <table> or <tbody> instead of multiple <tr> elements
• Use .innerHTML or .html() instead of DOM manipulation
• Build an array with a[++i] and .join() it instead of string concatenation
• Use a bare-metal for loop instead of $.each
• Reduce name lookups*/

$(document).ready( function() {
	function fillTable( names ) {
		// Reduce name lookups with local function name
		var e = esc;
		//
		var html = [], h = -1;
		html[++h] = '<table id="nameTable">';
		html[++h] = '<tbody>';
		for( var name, i = -1; name = names[++i]; ) {
		html[++h] = '<tr><td class="name">';
		html[++h] = e(name.first);
		html[++h] = ' ';
		html[++h] = e(name.last);
		html[++h] = '</td><td class="address">';
		html[++h] = e(name.street);
		html[++h] = '<br />';
		html[++h] = e(name.city);
		html[++h] = ', ';
		html[++h] = e(name.state);
		html[++h] = ' ';
		html[++h] = e(name.zip);
		html[++h] = '</td></tr>';
		}
		html[++h] = '</tbody>';
		html[++h] = '</table>';
		$('#container')[0].innerHTML = html.join('');
	}
	$.getJSON( 'names-1000.json', function( json ) {
		fillTable( json.names );
	});
});

/******************************************************************************************/
//两种each循环
//for array
$.each( array, function() {
// do stuff with this
});
//for objects
$('.lotsOfElements').each( function() {
// do stuff with this or $(this)
});
/******************************************************************************************/
//写for循环而不是each循环
//上述each循环如果数据量很大的话，会很慢，此时用for循环会加快速度
//1.for array
for(var item, i = -1; item = array[++i];)
{
	// do stuff with item
}
//注意：使用时每个item都不能has  “false” elements, that is,elements whose value is undefined, null, false, 0, or "".
//因为只有当条件表达式（item = array[++i]）的值为 true 时，才进入 for 循环

//2.for objects,如果其中没有一个元素是null,Just be sure to cache the object in a variable:
var $items = $('.lotsOfElements');
for( var item, i = -1; item = $item[++i];){
	// do stuff with item (a DOM node)
}
//3.比较通用的for循环写法
for( var i = 0; i < array.length; i++ ) {
	var item = array[i];
	// do stuff with item
}
/*对于以上的循环可以有三点提高
 * But you can improve that loop in three ways:
• Cache the array length.将array length赋给临时变量
• Use ++i, which is faster than i++ in some browsers.//使用++i
• Combine the test and increment of the loop variable to remove one name lookup.//将递增与比较结合在一起以减少一个name lookup
 */
for( var i = -1, n = array.length; ++i < n; ) {
	var item = array[i];
	// do stuff with item
}
//4.对于object的循环，还可以用for in循环（array不可以）
//for-in 语句是严格的迭代语句，用于枚举对象的属性。
//例如：
for (sProp in window) {
  alert(sProp);
}
//这里，for-in 语句用于显示 window 对象的所有属性。PropertyIsEnumerable() 是 ECMAScript 中专门用于说明属性是否可以用 for-in 语句访问的方法。
//这个是用来迭代对象的通用形式（这里指的是JSON对象）
for( var key in object ) {
	var item = object[key];
	// do stuff with item
}
//注意：永远不要迭代一个jQuery Object或者一个数组，原因与举例如下：
/*Never use a for..in loop to iterate over a jQuery object or an array of any type. 
 * If the array has any custom properties or methods, those will be iterated along with the numeric
array elements.
For example, this code enumerates a single DOM element, the
document body (with i = 0):
$('body').each( function( i ) { console.log( i ); });
This code may look like it would do the same thing, but it enumerates all of the jQuery
methods such as show and css along with the [0] element:
for( var i in $('body') ) console.log( i ); // BAD
Instead, use one of the array loops listed previously.
Even the “safe” use of a for..in loop to iterate over an object can get in trouble if any
code on your page has modified Object.prototype to extend all objects with additional
methods or properties. The loop will enumerate those methods or properties along
with the ones you want.*/
/*
 * $(selector).each(fn) is the customary way to create a jQuery object and iterate over
it, but it’s not the only way. The jQuery object is an “array-like” object with .length
and [0], [1], ..., [length-1] properties. Therefore, you can use any of the looping
techniques you would use with any other array. And because the jQuery object never
contains “false” elements, you can use the fastest for loop listed at the beginning of the
solution.
 */
/*******************************************************************************************/
//减少命名查找
//全局变量，全局方法，外层变量，外层方法都将其赋给local变量
//改善原因：The inner loop calls several global functions, 
//and it references some variables defined in the outer functions or globally.
//Each of these references is triggering several name lookups because of the nested functions.
//Remember that JavaScript looks up a name first in the local scope (function), and if the
//name isn’t found there, it works its way up through the parent nested functions and
//finally the global scope.
(function() {
// Find the largest absolute value in an array of numbers
	function maxMagnitude( array ) {
		var largest = -Infinity;
		$.each( array, function() {
			largest = Math.max( largest, Math.abs(this) );
		});
		return largest;
	}// Other code here calls maxMagnitude on a large array
})();
/*So, if this block of code is in the global scope, the each() callback does the following
name lookups in every iteration:
1. largest in local scope [fail]
2. largest in MaxMagnitude() [success]
3. Math in local scope [fail]
4. Math in MaxMagnitude() [fail]
5. Math in anonymous wrapper function [fail]
6. Math in global scope [success]
7. abs in Math object [success]
8. Math in local scope [fail]
9. Math in MaxMagnitude() [fail]
10. Math in anonymous wrapper function [fail]
11. Math in global scope [success]
12. max in Math object [success]
13. largest in local scope [fail]
14. largest in MaxMagnitude() [success]
Now rewrite the code as follows:*/
// A typical wrapper to get a local scope
(function() {
// Find the largest absolute value in an array of numbers
	function maxMagnitude( array ) {
		var abs = Math.abs, max = Math.max;
		var largest = -Infinity;
		for( var i = -1, n = array.length; ++i < n; ) {
			largest = max( largest, abs(array[i]) );
		}
		return largest;
	}
// Other code here calls maxMagnitude on a large array
})();
/*This not only eliminates the callback function call in every iteration, it also reduces the
number of name lookups per iteration by 10 or more. The loop body in this version
does these name lookups:
1. largest in local scope [success]
2. abs in local scope [success]
3. max in local scope [success]
4. largest in local scope [success]
That’s more than a 70 percent improvement over the first version.*/
//filltable的例子，原本6次使用esc方法*1000个name*4层nest=24,000次lookup
//更新后:6次使用esc方法*1000个name*1层nest(一是因为使用了局部变量，二是因为使用了for循环只有一层嵌套)=6000次lookup
//这对于性能肯定是有很大提升的
/******************************************************************************************/
//更快地更新DOM
//html()有时会比较慢，innerHTML会更高效一点
//html()与.innerHTML的不同之处,html()调用了clean()方法，会自动完善单标记，并去除之前所有的事件监听器
$('#mydiv').html(myhtml);
$('#mydiv')[0].innerHTML = myhtml;
/*
 * If there are any event handlers in the content being replaced,
you should stick with .html(), or if you just need this event handler cleanup but don’t
need the other HTML cleanup, you could possibly use $('#test').empty()
[0].innerHTML = myhtml; to get the event cleanup only.
 */

/**********************************************************************************/
/*
The easiest way to find most methods in the jQuery source code is to
search for the method name with a : after it; e.g., to find the .clean()
method, search for clean: in the uncompressed jQuery source.*/

///**************************************************************************************/
////传参数给setTimeout,但参数似乎没有得到
//function delayLog( text ) {
//setTimeout( "alert(text)", 1000 );
//}
///*Indeed, the problem here is that when a string argument is passed to setTimeout(), it
//is executed in the global scope, i.e., as if the code were located outside of any function.
//The easiest way to fix it is to use a local function for the callback instead of a text string:*/
////原因在于如果是传字符串的话，那么这段代码是在全局范围内执行的，只要将其放到function中，就可以变成局部的
////代码了,这样就可以从外部方法获得传入的参数
//function delayLog( text ) {
//	setTimeout( function() {
//		alert(text);
//	}, 1000 );
//}
///******************************************************************************************/
////如何确定错误不是jQuery造成的
////eg:
//function delayLog( text ) {
//setTimeout( "$('#log').show().html(text)", 1000 );
//}
//// ... and somewhere else in the code ...
//delayLog( 'Hello' );
////发现这个方法有问题,将jQuery部分替换成纯 JS
//function delayLog( text ) {
//setTimeout( "alert(text)", 1000 );
//}
////如果问题依然存在，说明这个问题不是jQuery造成的

/******************************************************************************************/
//调试jQuery的链式代码
//使用jQuery时常常是链上一长串的代码，这样不太方便调试错误，怎么办呢？将每一个长链切断，一块一块地调试即可
