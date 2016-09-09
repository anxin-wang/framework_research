/**
 * jQuery中的构造器
 * 基于jQuery2.0.3
 */


var jQuery = function (selector, context) {
    // The jQuery object is actually just the init constructor 'enhanced'
    //返回构造函数返回的对象，jQuery原型的init方法
    return new jQuery.fn.init(selector, context, rootjQuery);
}

jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    init: function (selector, context, rootjQuery) {
        var match, elem;

        // HANDLE: $(""), $(null), $(undefined), $(false)
        if (!selector) {
            return this;
        }

        // Handle HTML strings
        if (typeof selector === "string") {
            if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                // Assume that strings that start and end with <> are HTML and skip the regex check
                match = [null, selector, null];

            } else {
                match = rquickExpr.exec(selector);
            }

            // Match html or make sure no context is specified for #id
            if (match && (match[1] || !context)) {

                // HANDLE: $(html) -> $(array)
                if (match[1]) {
                    context = context instanceof jQuery ? context[0] : context;

                    // scripts is true for back-compat
                    jQuery.merge(this, jQuery.parseHTML(
                        match[1],
                        context && context.nodeType ? context.ownerDocument || context : document,
                        true
                    ));

                    // HANDLE: $(html, props)
                    //第一个参数单标签，第二个参数json对象
                    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                        for (match in context) {
                            // Properties of context are called as methods if possible
                            if (jQuery.isFunction(this[match])) {
                                this[match](context[match]);

                                // ...and otherwise set as attributes
                            } else {
                                this.attr(match, context[match]);
                            }
                        }
                    }

                    return this;

                    // HANDLE: $(#id)
                } else {
                    elem = document.getElementById(match[2]);

                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    if (elem && elem.parentNode) {
                        // Inject the element directly into the jQuery object
                        this.length = 1;
                        this[0] = elem;
                    }

                    this.context = document;
                    this.selector = selector;
                    return this;
                }

                // HANDLE: $(expr, $(...))
                // 处理有context的情况，这两个方法的目的是将context对象变成jQuery对象，然后调用find方法
                // context.jquery能判断是否是jquery对象
                // 如果context是jquery对象或者是空对象的时候，直接用该对象调用find方法
            } else if (!context || context.jquery) {
                return ( context || rootjQuery ).find(selector);

                // HANDLE: $(expr, context)
                // 如果context是dom对象，则放到this.constructor中，相当于调用$()方法，将其变成jquery对象
                // 所以最好直接写find方法，反正内在的原理也是find方法的调用
                // (which is just equivalent to: $(context).find(expr)
            } else {
                return this.constructor(context).find(selector);
            }

            // HANDLE: $(DOMElement)
        } else if (selector.nodeType) {
            this.context = this[0] = selector;
            this.length = 1;
            return this;

            // HANDLE: $(function)
            // Shortcut for document ready
            // document ready方法的简写形式，如果是方法的话，使用rootjQuery方法来调用
        } else if (jQuery.isFunction(selector)) {
            return rootjQuery.ready(selector);
        }


        // 如果selector上还有selector值和context值，将其赋予this对象
        //$('#div1') === $($('#div'))
        if (selector.selector !== undefined) {
            this.selector = selector.selector;
            this.context = selector.context;
        }


        //处理$([])数组，$({}),加第二个参数this对象就变成json对象

        return jQuery.makeArray(selector, this);
    }
};

// Give the init function the jQuery prototype for later instantiation
// 这句话将jQuery.prototype赋给init方法的prototype,这样通过init方法创造出来的对象也可以拥有jQuery.prototype下的所有方法
jQuery.fn.init.prototype = jQuery.fn;