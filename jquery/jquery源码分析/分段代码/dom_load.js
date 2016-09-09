/**
 * jQuery中的DOM加载过程
 * 基于jQuery2.0.3
 */

var readyList,
    // 公共方法提取
    completed = function () {
        document.removeEventListener("DOMContentLoaded", completed, false);
        window.removeEventListener("load", completed, false);
        jQuery.ready();
    };
    ;


//第一步
jQuery.fn = jQuery.prototype = {

    //每次写$(document).ready(fn)调用的就是这个函数
    ready: function (fn) {
        // Add the callback
        // jQuery.ready.promise()对象一旦resolvedWith，并执行fn函数
        jQuery.ready.promise().done(fn);

        return this;
    },

    /*
    **另外init方法中还有这样一段，$(document).ready(fn)的缩写$(fn)
    **  else if (jQuery.isFunction(selector)) {
           return rootjQuery.ready(selector);
        }
    **
     */
}




jQuery.extend({
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,

    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,

    // Hold (or release) the ready event
    holdReady: function (hold) {
        //传true,readyWait++
        //传false,调用ready方法
        if (hold) {
            jQuery.readyWait++;
        } else {
            jQuery.ready(true);
        }
    },

    // Handle when the DOM is ready
    // 第三步

    ready: function (wait) {

        // 处理holdReady hold传false的情况
        // 如果wait为true,将readyWait先减减，如果为0则整个判断为false
        // 如果wait为false,则为默认情况，如果isReady为false则整个判断为false
        // Abort if there are pending holds or we're already ready
        if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
            return;
        }

        // 将isReady设为true,即为已加载dom,下次就不会再进入(进入上一个if就会return
        // Remember that the DOM is ready
        jQuery.isReady = true;

        // If a normal DOM Ready event fired, decrement, and wait if need be
        // 如果wait不为true但readyWait减减后不为0且大于0，说明有holdReady没有释放，此时也是return
        if (wait !== true && --jQuery.readyWait > 0) {
            return;
        }

        // If there are functions bound, to execute
        // 延迟对象readyList触发done方法
        readyList.resolveWith(document, [jQuery]);

        // Trigger any bound ready events
        if (jQuery.fn.trigger) {
            // 触发ready事件并取消ready事件的绑定
            jQuery(document).trigger("ready").off("ready");
        }
    },
});

//第二步
//$(document).ready(fn)根据这里promise对象的状态，如果为resolved则触发done方法
jQuery.ready.promise = function (obj) {
    // 如果延迟对象readyList不存在，新建一个
    if (!readyList) {

        readyList = jQuery.Deferred();

        // Catch cases where $(document).ready() is called after the browser event has already occurred.
        // we once tried to use readyState "interactive" here, but it caused issues like the one
        // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15

        // 如果readyState等于complete，即文档已经加载
        /*
         document.readyState:判断文档是否加载完成。firefox不支持。

         这个属性是只读的，传回值有以下的可能：

         0-UNINITIALIZED：XML 对象被产生，但没有任何文件被加载。
         1-LOADING：加载程序进行中，但文件尚未开始解析。
         2-LOADED：部分的文件已经加载且进行解析，但对象模型尚未生效。
         3-INTERACTIVE：仅对已加载的部分文件有效，在此情况下，对象模型是有效但只读的。
         4-COMPLETED：文件已完全加载，代表加载成功。
         */
        if (document.readyState === "complete") {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            //在这里调用jQuery.ready()方法
            setTimeout(jQuery.ready);

        } else {

            // 如果文档没有加载，DomContentLoaded事件和load事件均加上completed方法

            // Use the handy event callback
            document.addEventListener("DOMContentLoaded", completed, false);

            // A fallback to window.onload, that will always work
            window.addEventListener("load", completed, false);
        }
    }
    //返回延迟对象的promise对象
    return readyList.promise(obj);
};



