/**
 * jQuery中的类型判断
 * 基于jQuery2.0.3
 */

var class2type = {}

jQuery.extend({

    // See test/unit/core.js for details concerning isFunction.
    // Since version 1.3, DOM methods and functions like alert
    // aren't supported. They return false on IE (#2968).
    isFunction: function (obj) {
        // 使用jQuery.type方法判断
        return jQuery.type(obj) === "function";
    },

    //直接调用array的isArray方法

    isArray: Array.isArray,

    isWindow: function (obj) {
        //首先不等于undefined,且不等于null，且后一句只有window===window.window才为真，其他情况都不为真
        return obj != null && obj === obj.window;
    },

    isNumeric: function (obj) {
        //首先不是NaN,并且没有超出最大值，且能通过类型转换转成float类型
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    },

    type: function (obj) {
        // undefined 和 null 的情况
        if (obj == null) {
            return String(obj);
        }
        // Support: Safari <= 5.1 (functionish RegExp)
        // js的基本类型以及系统对象类型
        // 如果是基本类型中的object或function,则进一步进行系统对象判断，array,date等
        return typeof obj === "object" || typeof obj === "function" ?
        class2type[core_toString.call(obj)] || "object" :
            typeof obj;
    },

    isPlainObject: function (obj) {
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
            return false;
        }

        // Support: Firefox <20
        // The try/catch suppresses exceptions thrown when attempting to access
        // the "constructor" property of certain host objects, ie. |window.location|
        // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
        try {
            if (obj.constructor && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            return false;
        }

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by {} or constructed with new Object
        return true;
    },

    //如果for in循环出不来任何东西，就是空对象
    isEmptyObject: function (obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    },

});


jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
});
