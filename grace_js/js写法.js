// Used for splitting on whitespace
core_rnotwhite = /\S+/g
jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});


options = typeof options === "string" ? 
( optionsCache[ options ] || createOptions( options ) ) 
: jQuery.extend( {}, options );

//以对象方式写函数
var fun_a=function(args){
	var local_variable_list//可以做一些简单的处理,以逗号分隔;
	func_private_a=function(args){

	},
	func_private_b=function(args){

	},
	self={
		func_public_a: function() {
			return this;
		},
		func_public_b: function() {
			return this;
		}	
	};

	return self;
}

