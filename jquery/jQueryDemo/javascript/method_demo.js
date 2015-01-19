/**
 * @author Sophie
 */
$(document).ready(function(){
	console.log($("a","div"));
	console.log($("a"));
	//console.log($("a").index());
	console.log($("a","div").size());
	console.log($("a","div").toArray()[0]==$("a","div")[0]);
	jQuery.data($("a")[0],"test",{first:"pizza!",last:16})
	console.log($("a","div"));
	console.log(jQuery.data($("a")[0],"test").first)
	jQuery.removeData($("a")[0],"test");
	console.log(jQuery.data($("a")[0],"test").first)
})
