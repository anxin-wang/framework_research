/**
 * Created by Administrator on 2015/9/16.
 */
+function ($) {
    'use strict';
    /*==================================================
     对象类
     ====================================================*/
    var Plugin_Name = function (element, options) {
        this.$element      = $(element);
        this.options       = $.extend({}, Plugin_Name.DEFAULTS, options);
        //...定义对象的其他变量

    };

    //定义类的静态变量
    Plugin_Name.VERSION  = '3.3.2'
    Plugin_Name.DEFAULTS = {
        toggle: true,
        trigger: '[data-toggle="collapse"]'
    }



    /*==================================================
     Prototype
     ====================================================*/
    Plugin_Name.prototype={}



    // BUTTON PLUGIN DEFINITION
    // ========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            //html上的data标签扩展，可作为参数
            var data    = $this.data('bs.Plugin_Name')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.Plugin_Name', (data = new Plugin_Name(this, options)))

            if (typeof option == 'string') data[option]()


            //if (option == 'toggle') data.toggle()
            //else if (option) data.setState(option)
        })
    }

    var old = $.fn.Plugin_Name

    $.fn.Plugin_Name             = Plugin
    $.fn.Plugin_Name.Constructor = Plugin_Name


    // BUTTON NO CONFLICT
    // ==================

    $.fn.button.noConflict = function () {
        $.fn.button = old
        return this
    }



}(jQuery);





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
