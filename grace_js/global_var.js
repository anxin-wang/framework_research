/*方式一：使用匿名函数包起来，可解决全局变量泛滥的问题，但无法解决函数之间通信
 * *
 */
(function(){
	var a=123,b="hello world";
	//something else
})();



/*方式二：解决以上匿名函数通信问题
*在window作用于下定义一个全局变量，把它当做一个桥梁，完成匿名函数之间的通信
* 问题：必须严格控制全局变量的数量，否则使用匿名函数便失去意义
 */
var str,str2;
(function(){
	var a=123,str=b="hello world";
	//something else
})();

(function(){
	var b=str;
	var d="my friend!";
	d=b+","+d;
	//something else
})();

/*方式三：
 * 为了解决方式二的问题，我们使用json对象来定义全局变量
 * 问题：项目规模大了之后，全局变量容易在多个模块间产生冲突
 */
var GLOBAL={};
(function(){
	var a=123,b="hello world";
	GLOBAL.str=b;
	GLOBAL.str2=a;
	//something else
})();

(function(){
	var a=GLOBAL.str;
	var b=GLOBAL.str2;
	d=a+","+b;
	//something else
})();

/*方式四：
 * 为了解决方式三的问题，我们可以使用命名空间来解决这个问题，一个模块的变量放在一个命名空间下
 * 一般情况下，命名空间的数量不会特别多，避免命名空间冲突相对而言比较容易
 */
var GLOBAL={};
(function(){
	var a=123,b="hello world";
	GLOBAL.A={};
	GLOBAL.A.str=b;
	GLOBAL.A.str2=a;
	//something else
})();

(function(){
	var a,c="abc";
	GLOBAL.B={};
	GLOBAL.B.str=c;
	
	//something else
})();
(function(){
	var a=GLOBAL.A.str2,b=GLOBAL.A.str;
	//something else
})();
(function(){
	var test=GLOBAL.B.str;
	//something else
})();

/*
 * 方式五：如果一个匿名函数中的程序非常复杂，变量名很多，命名空间还可以进一步扩展，生成二级命名空间
 */
var GLOBAL={};
(function(){
	var a=123,b="hello world";
	GLOBAL.A={};
	GLOBAL.A.DOG={};
	GLOBAL.A.CAT={};
	GLOBAL.A.CAT.name="mimi";
	GLOBAL.A.DOG.name="wangcai";
	GLOBAL.A.CAT.move=function(){
		
	}
	GLOBAL.A.DOG.move=function(){
		
	}
	//something else
})();
/*
 * 方式六：将生成命名空间的功能定义成一个函数
 */
var GLOBAL={};
GLOBAL.namespace=function(str){
	var arr=str.split("."),o=GLOBAL;
	for(i=(arr[0]=="GLOBAL") ? 1:0;i<arr.length;i++){
		//这个语句是一个赋值或者初始化语句
		//该语句在o[arr[i]]已经被初始化过后o[arr[i]]的值不变，即执行o[arr[i]] = o[arr[i]]这一部分
		//当o[arr[i]]未被初始化，即typeof o[arr[i]] = 'undefined'时，执行后面部分即o[arr[i]] = {}来初始化一个对象
		o[arr[i]]=o[arr[i]] || {};
		o=o[arr[i]];
	}
}

(function(){
	var a=123,b="hello world";
	GLOBAL.namespace("A.CAT");
	GLOBAL.namespace("A.DOG");
	GLOBAL.A.CAT.name="mimi";
	GLOBAL.A.DOG.name="wangcai";
	GLOBAL.A.CAT.move=function(){
		
	}
	GLOBAL.A.DOG.move=function(){
		
	}
	GLOBAL.A.str=a;
	GLOBAL.A.str2=b;
	//something else
})();


