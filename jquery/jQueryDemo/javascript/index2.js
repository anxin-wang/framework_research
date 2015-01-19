/**
 * @author Sophie
 */
$(function(){
	var $a=$("a");
	console.log($a);
	//jQuery to DOM
	var a=$a[0];
	var b=$a.get(1);
	console.log(a);
	console.log(b);
	//DOM to jQuery
	console.log($(a))
	
	//Attribute
	console.log('***************example 2**********');
	console.log($a.attr('href'))
	console.log($a.attr('class'))
	console.log('***************example 3:get each element\'s attribute**********');
	$a.each(function(index,element){
		console.log(index);
		console.log(element);//DOM Object
		console.log($(element).attr('href'))
		console.log(this==element);//this equals to element
	})
	console.log('***************example 4:set each element\'s attribute**********');
	//form 1:
	$a.attr('href','http://www.google.com').each(function(index,element){
		console.log($(element).attr('href'))
	});
	//form 2:
	$a.attr({
		href:'http://www.google.com',
		'class':'red'
	});
	//form 3:
	$a.attr('id',function(index,attr){
		console.log(attr);
		if(attr=='1'){
			return '##1'
		}
	})
	$a.each(function(index,element){
		console.log($(element).attr('id'));
	})
	console.log('*****************************example 4:selector within a context**********************')	
	console.log($('a',$('form')));
	console.log($('a','form'));
	console.log($('a',document.forms[0]));
	
	alert(jQuery('p').filter('.middle').find('span').end().end().length); //alerts 3
	jQuery('div').find('p').andSelf().css('border','1px solid #993300');
	
	jQuery('li:eq(1)').next() //selects the third <li>
	jQuery('li:eq(1)').prev() //selects the first <li>
	jQuery('li:eq(1)').parent() //selects the <ul>
	jQuery('li:eq(1)').parent().children() //selects all <li>s
	jQuery('li:eq(1)').nextAll() //selects all the <li>s after the second <li>
	jQuery('li:eq(1)').prevAll() //selects all the <li>s before the second <li>
	//Keep in mind that these traversing methods produce a new wrapper set, and to return to the previous wrapper set, you can use end().
	//many of the methods will accept an optional parameter that can be used to filter the selections.
	
	console.log('*****************************example 5:map**********************')
	console.log($("a").map(function(){
		return $(this).attr('href')
	}))
	console.log('*****************************example 6:contents**********************')
	console.log($("form").contents());
})
