// Used for splitting on whitespace
// 用于分割空格符
core_rnotwhite = /\S+/g


jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});


options = typeof options === "string" ? 
( optionsCache[ options ] || createOptions( options ) ) 
: jQuery.extend( {}, options );





//以对象方式写类
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


//*************************************************第二种方式写类
//定义公共变量
var local_variable_list//可以做一些简单的处理,以逗号分隔;

//定义类
function Data() {
    //定义私有变量
    this.expando = jQuery.expando + Math.random();
}
//定义类变量
Data.uid = 1;
//定义类方法
Data.accepts = function (owner) {};
//定义对象方法
Data.prototype = {
    key: function (owner){},
    access: function (owner, data, value){}

}
data_user = new Data();

//将组件方法安装到类库上
jQuery.extend({
    data: function (elem, name, data) {
        //调用prototype的方法
        return data_user.access(elem, name, data);
    },
});

//
jQuery.fn.extend({
    data: function (key, value) {
        //先对参数进行一下过滤，处理
        //最后还是调用data_user的方法
    }
}