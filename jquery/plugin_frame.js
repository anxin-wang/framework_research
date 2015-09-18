/**
 * Created by Administrator on 2015/9/16.
 */
(function () {
    'use strict';
    var $;
    /*==================================================
     对象类
     ====================================================*/
    var Plugin_Name = function (container, params) {

    };
    /*==================================================
     Prototype
     ====================================================*/
    Plugin_Name.prototype={}

    window.Plugin_Name = Plugin_Name;
})();

/*===========================
  AMD Export
 ===========================*/
if (typeof(module) !== 'undefined')
{
    module.exports = window.Plugin_Name;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Plugin_Name;
    });
}
