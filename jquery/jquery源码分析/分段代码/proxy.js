/**
 * Created by ouyotsubakuro on 16-9-9.
 */

jQuery.extend({
    proxy: function (fn, context) {
        var tmp, args, proxy;

        /*
         处理简写方式：
         $(document).click($.proxy(obj,'show'));
         */

        if (typeof context === "string") {
            // 做一下两个参数的交换
            tmp = fn[context];
            context = fn;
            fn = tmp;
        }

        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        if (!jQuery.isFunction(fn)) {
            return undefined;
        }

        // Simulated bind
        // 将传入的参数进行分割，从第三个开始都是fn的参数
        args = core_slice.call(arguments, 2);
        proxy = function () {
            /* 1.fn调用
             2.context为context或this对象
             3.proxy方法的参数先进行转数组操作:core_slice.call(arguments)
             4.然后将其与args合并
             例如:
             function show(n1,n2){
             alert(n1);
             alert(n2);
             alert(this);
             $.proxy(show,document,3)(4);
             这个例子中：3是args,4是arguments
             */
            return fn.apply(context || this, args.concat(core_slice.call(arguments)));
        };

        // Set the guid of unique handler to the same of original handler, so it can be removed
        // 将guid设好，以便可以将事件移除
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;

        // 将proxy返回
        // 例如$.proxy(show,document,3)返回的就是proxy，然后调用便执行proxy = function () {};
        // 然后返回fn的执行结果

        return proxy;
    }

});