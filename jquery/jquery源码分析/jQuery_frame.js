/**
 * Created by Administrator on 2016/1/27.
 */

var jQuery = (function () {      //在window范围内定义了一个变量叫jQuery。这个变量里面有什么呢？最后的return 语句，看出该对象到最后是个函数对象
    var jQuery = function () {//这个jQuery是一个函数对象，当我们写jQuery("id")时，走的就是该方法。该方法会返回一个对象，是什么对象后文说明。
        return new XXX();
    }
    jQuery.fn = jQuery.prototype = {//prototype表明：这里的3个方法，是对象方法（实例方法） ；而“fn”则是jQuery函数对象的一个对象，这个对象包含3个方法。我们可以直接jQuery.fn.XXX()地来引用，可见这3个方法也可以看作静态工具方法。
        XXX: YYY()
        {
        }
        ,
        XXX:YYY()
        {
        }
        ,
        XXX:YYY()
        {
        }
    }
    jQuery.extend = jQuery.fn.extend = function () {//把这个extend方法加入到fn里头去。这样同时也把extend放到实例方法区域去了。关于extend的解析后面说明
        STATEMENT;
    }
    jQuery.extend({//由于extend函数的作用是  把参数对象的东西拷贝到this指向的对象上，目前的this是什么？是函数对象。因此这里加入的3个方法都是静态工具方法。
    XXX: YYY()
    {
    }
    ,
    XXX:YYY()
    {
    }
    ,
    XXX:YYY()
    {
    }
    })
    STATEMENT;
    return (window.jQuery = window.$ = jQuery);
})();
