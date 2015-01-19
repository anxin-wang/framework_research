/**
 * @author Sophie
 */
//插件的配置项
//1.可以使用默认的，但大多情况不合适
//2.使用配置项来覆盖默认的
//3.如果很多组件都要使用配置项，为了避免重复写可以将配置项抽取出来，如：
$('#msg').dialog({
	height: 300,
	width: 400,
	draggable: false,
	modal: true,
	buttons: {
		'OK': function(event, ui) {
			$(this).dialog('close');
		}
	}
	//...
});
/************************************************************************************/
//如何才能变成一句简单的$('#msg').dialog();
//方法一：重写插件的default
$.extend($.ui.dialog.defaults, {
	height: 300,
	width: 400,
	draggable: false,
	modal: true,
	buttons: {
		'OK': function(event, ui) {
			$(this).dialog('close');
		}
	}
});
//...
$('#msg').dialog();
//...
$('#note').dialog();
//如果之后的init配置项与重写的不一样，依然可以用自定义的配置项来配置,override之前的对象依然是plugin默认的配置项，不会使用重写后的配置项

//方法二：将配置项做成一个对象，init时传进去
var options = {
	height: 300,
	width: 400,
	draggable: false,
	modal: true,
	buttons: {
		'OK': function(event, ui) {
			$(this).dialog('close');
		}
	}
};
$('#msg').dialog(options);
/*******************************************************************************************/
//获取配置项的值
var active = $('#myDiv').accordion('option', 'active');
//设置配置项的值
$('#myDiv').accordion('option', 'active', 3);
/********************************************************************************************/
//事件
// Declaring an event callback option on init
$('#shopping-cart').droppable({
	drop: function(event, ui) {
		addProduct(ui.draggable);
	}
});
// Declaring an event callback after init using the option method
$('#shopping-cart').droppable();
//...
$('#shopping-cart').droppable('option', 'drop', function(event, ui) {
	addProduct(ui.draggable);
});
//Solution 2: Bind to the Custom Event Using the Event Type
//Use the jQuery .bind() method, and bind to the type of the event:
$('#shopping-cart').bind('drop', function(event, ui) {
	addProduct(ui.draggable);
});
//If you want to both destroy and remove a plugin element, you can simply call .remove().