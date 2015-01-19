/**
 * @author Sophie
 */
//如果多个事件绑定同一个方法,简化写法,bind
//形式一:
function handler(e){
alert('event');
}
jQuery('div').click(handler)
.keydown(handler);
//形式二:
jQuery('div').bind('click keydown', function(e){
alert('event');
});
//You can also apply this behavior to unbind() and one()
/*************************************************************************/
//如果事件的数据不同,bind
//Here’s an example:
jQuery('#button1').click(function(e){
	jQuery('div.panel').hide();
	jQuery('#panel1').show();
	jQuery('#desc').text('You clicked the red button');
});
jQuery('#button2').click(function(e){
	jQuery('div.panel').hide();
	jQuery('#panel2').show();
	jQuery('#desc').text('You clicked the blue button');
});
jQuery('#button3').click(function(e){
	jQuery('div.panel').hide();
	jQuery('#panel3').show();
	jQuery('#desc').text('You clicked the green button');
});
//我们不用为了数据不同而写三次方法的内容，使用bind的第二个参数来传递数据，
//Note that this value can be anything...an array, a string, a number, or an object literal.
/*event.data is used to provide precomputed values to a function, which means the values
you will be passing to bind() need to be already available at binding time. To handle
more “dynamic” values, there’s another way that we’ll learn about in Recipe 8.5.
The solution to the previous problem could look something like this:*/
function buttonClicked(e){
	jQuery('div.panel').hide();
	jQuery('#panel'+e.data.panel).show();
	jQuery('#desc').text('You clicked the '+e.data.color+' button');
}
jQuery('#button1').bind('click',{panel:1, color:'red'}, buttonClicked);
jQuery('#button2').bind('click',{panel:2, color:'blue'}, buttonClicked);
jQuery('#button3').bind('click',{panel:3, color:'green'}, buttonClicked);

/*Of course, you could make this even shorter by using a loop. This approach is called a
macro by some coders, and it’s a very common approach for jQuery code.
These macros will surely reduce the code length and can sometimes improve code
readability. Some other times, they’ll just make your code completely unreadable, so
use them with caution.
Here’s how you could do it:*/
jQuery.each(['red','blue','green'], function(num, color){
	num++; // it's 0-index based
	jQuery('#button'+num).bind('click',function(e){
	jQuery('div.panel').hide();
	jQuery('#panel'+num).show();
	jQuery('#desc').text('You clicked the '+color+' button');
});
})
/*As you can see, I haven’t used the data argument because we don’t really need it. The
code is now somewhat shorter, but not that much, and it’s not more readable.
The conclusion is that both approaches can be used on this kind of situation. Depending
on the problem, one could be better (shorter, more readable, easier to maintain)
than the other.*/
/*************************************************************************/
//移除一整套事件,bind
/*Use a unique namespace for each plugin you make. Any handler bound within this
plugin must be added with this namespace.
Later, when cleaning up, you just need to “unbind the whole namespace,” and all the
related event handlers will go away with one single line of code.
How to bind with a namespace?
To add a namespace to an event type, you simply add a . followed by the namespace
name.
Since jQuery 1.3, you can add more than one (namespace) per event.
This is how you would bind the click and mousedown functions with a namespace:*/
jQuery.fn.myPlugin = function(){
	return this
			.bind('click.myPlugin', function(){
// [code]
})
.bind('mousedown.myPlugin', function(){
// [code]
});
};
/*How to clean up my plugin?
To dispose the bindings above, you would do:*/
jQuery.fn.disposeMyPlugin = function(){
	return this.unbind('.myPlugin');
};
/********************************************************************************/
//触发特定的事件,trigger
//如果是有命名空间的事件
jQuery.fn.runMyPlugin = function(){
	return this.trigger('click.myPlugin');
};
//如果是排除有命名空间的事件,加一个感叹号
jQuery('div.panels').trigger('click!');
/**********************************************************************************/
//传递动态数据给事件函数,trigger
//如果在绑定时不知道数据，且每次调用是数据会改变
/*There are two ways of solving this problem:
• Passing extra arguments to trigger()
• Passing a custom event object to trigger()*/
//solution:1.通过trigger来改，问题是如果参数过多，看起来会很不优雅，所以I personally wouldn’t go beyond four to five
jQuery('form').trigger('submit', ['John','Doe', 28, {gender:'M'}]);
jQuery('form').bind('submit', function(e, name, surname, age, extra){
// Do something with these arguments
});
//2.自定义事件也是如此
jQuery('#slideshow').bind('add-image', function(e, src){
var $img = jQuery('<img />').attr('src', src);
jQuery(this).append($img);
});
jQuery('#slideshow').trigger('add-image', 'img/dogs4.jpg');
//3.另一种传递方式：自定义event object。比上一种好的地方在于参数再多也是一个参数：
//This means that, no matter how many data you’re passing, the handler will always have only a single argument, the event object.
//比如第一个例子可以改写成如下形式：
jQuery('form').bind('submit', function(e){
	// Do something with e.name, e.surname, etc.
});
jQuery('form').trigger({
	type:'submit',
	name:'John',
	surname:'Doe',
	age: 28,
	gender:'M'
});
//或者这种形式
var e = jQuery.Event('submit'); // the new operator can be omitted
e.name = 'John';
e.surname = 'Doe';
e.age = 28;
e.gender = 'M';
jQuery('form').trigger(e);
//You can, of course, use jQuery.extend instead of setting one attribute at a time.
/*
 * What’s the difference with event.data?
Using event.data is useful for static values that are accessible at the time when the
function was bound. When the data you need to pass must be evaluated later (or each
time), event.data won’t do for you.
 */
/**********************************************************************************************/
//在onReady之前对元素进行操作
//情况一：立即隐藏一个元素（或者其他样式上的操作）
/*So, your problem is directly related to styling, you want to apply a conditional styling
to an element, and this condition needs to be evaluated by JavaScript.
The right way to go about this is adding a specific CSS class to an element that is quickly
accessible, like the <html> element, and then style the element accordingly.
Do something like this:*/
//译文：你的问题与Styling有关，你想把一个样式加到元素上，且需要通过JS来加。
//正确的方法是：正确的方法是加一个特定的CSS给能迅速获得的元素，比如<html>,然后相应地给这些元素加上样式。
/*<!DOCTYPE html>
	<html>
		<head>
			<style type="text/css">
				//这里，给html元素加上一个类
				html.no-message #message{ display:none; }
			</style>
			<script src="assets/jquery-latest.js"></script>
			<script type="text/javascript">
				//下面这种做法是不好的
				// Bad
				jQuery(document).ready(function($){
					$('#message').hide();
				});
				//下面这种做法是正确的：直接给html元素加上no-message类，这样就可以使用style中定义的样式了
				// Correct
				jQuery('html').addClass('no-message');
				// or...
				document.documentElement.className = 'no-message';
</script>
</head>
<body>
<p id="message">I should not be visible</p>
<!--
Many more html elements
-->
</body>
</html>*/

//情况二：如果想在page load完之前就获取到某个元素，并绑定事件给它，event delegation ，live

//其他情况：
//方法一：一般有一个事件，在ExtJS里是afterrender,在jQuery里面可能是load，获取到某个元素，等它load完之后在对此元素进行获取
//写的位置：如果将这种代码写在document.ready里，其实也是没有用的，也是要等到整个DOM加载完后才有。
//所以这种方法最好写在元素的下面，或者直接写在JS文件，但不包在document.ready中
//方法二：自定义位置，与上种方法一样，写在某个元素的下面，但不用事件了
//Here is an example:
/*
<!DOCTYPE html>
<html>
	<head>
		<script src="assets/jquery-latest.js"></script>
	</head>
	<body>
		<p>The time is <span id="time">&nbsp;</span></p>
		<script type="text/javascript">
			jQuery('#time').text( new Date().toString() );
		</script>
		<!-- Many more html elements -->
	</body>
</html>*/
//方法三：Polling，使用类似setInterval来查找
/*
 * Polling can be implemented with a simple interval (setInterval) that checks 
 * for an element, and once found, a certain function is run, and the interval needs to be
cleared.
There are two plugins that can aid you with this. One is LiveQuery,‖ which has an option
to register a function to be run for each newly found element that matches a selector.
This approach is pretty slow but supports the whole set of selectors.
There’s another plugin called ElementReady# that will also handle this situation
properly.
It lets you register pairs of id/function, and it will poll the DOM. Once an id is found,
the function will be called, and the id is removed from the queue.
This plugin implements, probably, the fastest approach to detect elements, that is,
using document.getElementById. This plugin is pretty fast but only supports ids.
 */
/**************************************************************************************/
//停止事件的执行loop,event对象
/**************************************************************************************/
//使用event.target获得事件当前对象，event对象
/**************************************************************************************/
//避免事件被重复使用，例如hover,如果鼠标进出得很快，那么里面的方法可能上一次还没执行完，下一个就被触发了
//解决方法是：kill掉前一个未执行完的事件，然后再触发下一个事件
//具体到事件的代码，stop()这个方法可以对之前的动画kill掉
jQuery('#something').hover(
	function(){
		jQuery(this).stop().animate({opacity:1}, 1000);
	},
	function(){
		jQuery(this).stop().animate({opacity:0.8}, 1000);
	}
);
//This also works for custom jQuery animations, like slideUp(), slideDown(),fadeIn(), etc.
//This is the former example using the fade methods:
jQuery('#something').hover(
	function(){
		jQuery(this).stop().fadeTo( 1, 1000 );
	},
	function(){
		jQuery(this).stop().fadeTo( 0.8, 1000 );
	}
);
//但如果有连续两个动画，这个又行不通了
jQuery('#something').hover(
function(){
jQuery(this).stop()
.fadeTo( 1, 1000 )
.animate( {height:500}, 1000 );
},
function(){
jQuery(this).stop()
.fadeTo( 0.8, 1000 )
.animate( {height:200}, 1000 );
}
);
//会发现第一个动画是没有了，但是高度会不停地变化，因为动画是排成队列执行的，stop只暂停第一个动画，后面的继续执行
/*
 * The reason is simple; jQuery animations get queued by default. This means that if you
add several animations, they’ll get executed in sequence.
stop() by default only stops (and removes) the current animation. In our last example,
only the opacity animation will be removed each time, leaving the height animation in
the queue, ready to run.
为了解决这个问题，只需要传true给stop方法，就能取消所有的动画
To work around this, you have to either call stop() one more time or pass true as the
first argument. This will make stop() clean all the queued animations as well. Our
hover code should look like this:
 */
jQuery('#something').hover(
	function(){
		jQuery(this).stop(true)
			.fadeTo( 1, 1000 )
			.animate( {height:500}, 1000 );
	},
	function(){
		jQuery(this).stop(true)
			.fadeTo( 0.8, 1000 )
			.animate( {height:200}, 1000 );
	}
);
/************************************************************************************/
//使event handler对于新加的元素也有作用，delegation
//由于js是解释执行的，所以对于后加的元素，不会对其绑定事件，如：
function handler(){
	alert('got clicked');
}
jQuery('.clickable').bind('click', handler);
//以上这段代码做以下两件事：
/*
 * 1. Look for all elements with a CSS class “clickable” and save it to the collection.
   2. Bind the “handler” function to the click event of each element in the collection.
 */
//由于JS是执行语言而不是描述语言，所以对于之前有.clickable这个class的对象，有事件绑定上去，但是对于之后的.clickable
//对象就没有这个事件了
//解决方法：
//1.对于后来加的元素重新绑定，为了防止代码冗余，可以将handler做成一个named function,然后在绑的时候只需要写一个方法名就可以了
//2.事件委托:Delegation,live()
//要注意的是：event delegation cannot be used with events that don’t bubble, such as focus and
//blur. For these events, there’s a workaround that works cross-browser, using the
//focusin and focusout events in some browsers.
