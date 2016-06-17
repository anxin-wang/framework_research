( function (global, factory) {

        "use strict";
        //增加对模块化的支持，如果是模块化的话
        if ( typeof module === "object" && typeof module.exports === "object" ) {

            // For CommonJS and CommonJS-like environments where a proper `window`
            // is present, execute the factory and get jQuery.
            // For environments that do not have a `window` with a `document`
            // (such as Node.js), expose a factory as module.exports.
            // This accentuates the need for the creation of a real `window`.
            // e.g. var jQuery = require("jquery")(window);
            // See ticket #14549 for more info.
            module.exports = global.document ?
                factory( global, true ) :
                function( w ) {
                    if ( !w.document ) {
                        throw new Error( "jQuery requires a window with a document" );
                    }
                    return factory( w );
                };
        }
        //如果不是模块化的话
        else {
            factory( global );
        }
    }(
        //参数global,对window对象进行判断是否为undefined,实际上global参数也就是下面方法的window
        typeof window !== "undefined" ? window : this,
        //参数factory的实参，jQuery的主体
        function (window, noGlobal) {
            //1.(49-88)   定义变量 &定义 DOMEval( code, doc )方法

        }
    )
);