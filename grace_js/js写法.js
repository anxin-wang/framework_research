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


//*************************************************第二种方式写类*************/
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






//**********************************自执行函数 jQuery框架*****************//
(function (window, undefined) {

	//类变量定义

	var local_var="",

    //构造函数
	jQuery = function (selector, context) {
		// The jQuery object is actually just the init constructor 'enhanced'
		//返回构造函数返回的对象，jQuery原型的init方法
		return new jQuery.fn.init(selector, context, rootjQuery);
	};

	jQuery.fn = jQuery.prototype = {
		//对象变量定义
		jquery: core_version,
		length: 0,

		//实际的构造函数定义
		init: function (selector, context, rootjQuery) {},

		//对象方法定义
		toArray: function () {
			//TODO 函数定义
		},
		get: function (num) {
			//TODO 函数定义
		}

	}

	jQuery.fn.init.prototype = jQuery.fn;

    //非常重要的扩展方法
	jQuery.extend = jQuery.fn.extend = function () {
		var options, name, src, copy, copyIsArray, clone,
		// target为母对象
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		//处理深拷贝的情况，target为第二个参数，deep默认为false，传参时即为参数值，一般是true
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		// 当目标不是一个对象或不是一个函数时，将target设为空对象
		if (typeof target !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}

		// extend jQuery itself if only one argument is passed
		//如果参数值的数量等于i【i=1 or i=2】,则没有拷贝内容，返回对象本身
		if (length === i) {
			target = this;
			--i;
		}

		//这里才真正进行拷贝，对参数进行循环遍历

		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			//这句if将arguments[i]赋给options，arguments[i]从需要拷贝的内容开始，所以options等于需要拷贝的内容。并判断其不为空的情况下
			if ((options = arguments[i]) != null) {
				// Extend the base object
				for (name in options) {
					//src是返回值的某一项
					src = target[name];
					//copy是拷贝源的某一项
					copy = options[name];

					// Prevent never-ending loop
					//防止无限循环的情况,类似以下这种情况：
					//var a={job:"it"}
					//var b={name:a}
					//$.extend(a,b)
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					// 处理深拷贝的情况，这里是一个递归，如果copy是一个对象或函数的情况
					if (deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) )) {
						//如果是数组的情况
						if (copyIsArray) {
							copyIsArray = false;
							//判断一下src是不是数组，如果是的话,变量clone就等于src,如果不是的话就为空数组
							//本质上，是将src重新构造一下，如果本身存在，就在本身的基础上进行copy
							//变量clone是下一次循环的复制目标对象

							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							//如果是对象的情况
							//类似于这样的情况
							// var a={ name : { job:'it'});
							// var b={ name : {age:30}};
							// $.extend(true,a,b);
							// 此时 src={job:"it"},clone=src={job:"it"}
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						// 继续以上的例子，此时下面这句话变成：
						// target['name']=jQuery.extend(deep,{job:"it"},{age:30}),又再一次调用了extend方法，形成递归
						// 再次进入这个方法之后：if判断是通不过的，因为copy不是数组也不是对象
						// 所以会进入else if进行处理
						// 结果会是:target[”age“]=30

						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
						// 1.处理浅拷贝的情况
						// 也是跳出递归后的处理
						// target是母对象，name是子对象的key，copy是子对象的value。
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		// 最后将target返回
		return target;
	};



	// 可扩展性，类扩展
	// 相当于是一些常用公共方法的提取
	jQuery.extend({
		//类扩展属性
		isReady: false,
		readyWait: 1,

		//类扩展方法
		holdReady: function (hold) {},
		isFunction: function (obj) {}

	});



    //挂载jQuery,$别名
    if (typeof window === "object" && typeof window.document === "object") {
        window.jQuery = window.$ = jQuery;
    }
})(window);