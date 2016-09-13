/**
 * Created by ouyotsubakuro on 16-9-13.
 */
jQuery.fn = jQuery.prototype = {
    //可接受正数和负数
    eq: function (i) {
        var len = this.length,
            j = +i + ( i < 0 ? len : 0 );
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },

    //对数组进行二次处理

    map: function (callback) {
        return this.pushStack(jQuery.map(this, function (elem, i) {
            return callback.call(elem, i, elem);
        }));
    },
    // 进栈操作，相反出栈操作是end()
    pushStack: function (elems) {

        // Build a new jQuery matched element set
        // 新建一个jQuery对象，elems合并到jQuery()上，this.constructor相当于jQuery()
        var ret = jQuery.merge(this.constructor(), elems);

        // Add the old object onto the stack (as a reference)
        // ret的prevObject对象设为当前对象
        // ret的context设为当前上下文
        ret.prevObject = this;
        ret.context = this.context;

        // Return the newly-formed element set
        return ret;
    },
    end: function () {
        return this.prevObject || this.constructor(null);
    }
}

jQuery.extend({
    //处理命名冲突
    noConflict: function (deep) {
        //放弃对外接口$
        if (window.$ === jQuery) {
            window.$ = _$;
        }

        //放弃对外接口jQuery
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    },

    //格式转换
    parseHTML: function (data, context, keepScripts) {
        if (!data || typeof data !== "string") {
            return null;
        }
        //如果只传两个参数，且第二个是布尔值，则这个布尔值是keepScript而不是context
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }

        //给context赋值，传参的话为参数值，没传的话就是document
        context = context || document;


        //将标签进行单标签的正则转换
        var parsed = rsingleTag.exec(data),
        // 如果keepScript为true,则scripts为false;反之则为空数组
            scripts = !keepScripts && [];

        // Single tag
        // 单标签的情况
        if (parsed) {
            return [context.createElement(parsed[1])];
        }

        //这句话是关键执行，多标签的情况

        parsed = jQuery.buildFragment([data], context, scripts);

        // scripts为false时，if就不会进，scripts标签就不会被移除
        // script标签为空数组或有值时，script标签就会被移除

        if (scripts) {
            jQuery(scripts).remove();
        }

        //先是将DOM节点转成数组，这个方法返回的是数组

        return jQuery.merge([], parsed.childNodes);
    },

    // 全局执行
    globalEval: function (code) {
        var script,
            indirect = eval;

        code = jQuery.trim(code);

        if (code) {
            // If the code includes a valid, prologue position
            // strict mode pragma, execute code by injecting a
            // script tag into the document.
            // 有use strict的情况
            if (code.indexOf("use strict") === 1) {
                script = document.createElement("script");
                script.text = code;
                document.head.appendChild(script).parentNode.removeChild(script);
                //无use strict的情况，直接使用eval
            } else {
                // Otherwise, avoid the DOM node creation, insertion
                // and removal by using an indirect global eval
                indirect(code);
            }
        }
    },

    // Convert dashed to camelCase; used by the css and data modules
    // Microsoft forgot to hump their vendor prefix (#9572)
    //中划线转驼峰
    camelCase: function (string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },

    // args is for internal usage only
    // 集合遍历
    each: function (obj, callback, args) {
        var value,
            i = 0,
            length = obj.length,
        //判断是否是类数组
            isArray = isArraylike(obj);

        // 内部循环

        if (args) {
            if (isArray) {
                for (; i < length; i++) {
                    value = callback.apply(obj[i], args);

                    if (value === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    value = callback.apply(obj[i], args);

                    if (value === false) {
                        break;
                    }
                }
            }

            // A special, fast, case for the most common use of each
            // 外部使用
        } else {
            if (isArray) {
                for (; i < length; i++) {
                    value = callback.call(obj[i], i, obj[i]);

                    if (value === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    value = callback.call(obj[i], i, obj[i]);

                    if (value === false) {
                        break;
                    }
                }
            }
        }

        return obj;
    },


    // results is for internal usage only
    makeArray: function (arr, results) {
        var ret = results || [];

        if (arr != null) {
            //将参数转成obj对象，并判断是否是类数组
            // str在这里也可以通过判断，因为它有长度，只要有长度的都可以通过判断
            if (isArraylike(Object(arr))) {
                jQuery.merge(ret,
                    //如果arr是string类型，就返回[arr]
                    //否则，返回本身
                    // 最后将其合并到ret中，并将ret返回
                    typeof arr === "string" ?
                        [arr] : arr
                );
            }
            //不是类数组的情况，比如数字，就调用push方法
            else {
                core_push.call(ret, arr);
            }
        }

        return ret;
    },

    //返回元素在类数组中的下标

    inArray: function (elem, arr, i) {
        return arr == null ? -1 : core_indexOf.call(arr, elem, i);
    },

    merge: function (first, second) {
        var l = second.length,
            i = first.length,
            j = 0;

        //如果第二个参数有长度，就用for循环
        if (typeof l === "number") {
            //j小于第二个参数的长度l
            for (; j < l; j++) {
                first[i++] = second[j];
            }
        } else {
            //如果第二个参数没有长度，就用while来循环
            while (second[j] !== undefined) {
                first[i++] = second[j++];
            }
        }

        //最后循环出来的i值赋予first.length
        first.length = i;

        //返回first
        return first;
    },

    //过滤旧数组，返回新数组
    grep: function (elems, callback, inv) {
        var retVal,
            ret = [],
            i = 0,
            length = elems.length;
        //类型转换，将其变成boolean类型的值
        //undefined会变成false
        inv = !!inv;


        // Go through the array, only saving the items
        // that pass the validator function
        for (; i < length; i++) {
            //将返回值进行类型转换，转成布尔类型的值
            retVal = !!callback(elems[i], i);
            //如果retVal为真，则只有当inv为false时才进入判断，默认情况下就是这样
            //而当inv为true，即需要进行反转时，retVal为假，即不满足条件的值才会进入判断
            if (inv !== retVal) {
                ret.push(elems[i]);
            }
        }

        return ret;
    },

    // arg is for internal usage only
    //映射新数组，与grep不同的是新数组的值不是原数组，而是通过计算后的新值
    map: function (elems, callback, arg) {
        var value,
            i = 0,
            length = elems.length,
        //判断是否是数组
            isArray = isArraylike(elems),
            ret = [];

        // Go through the array, translating each of the items to their
        // 如果是数组的情况
        if (isArray) {
            for (; i < length; i++) {
                value = callback(elems[i], i, arg);

                if (value != null) {
                    ret[ret.length] = value;
                }
            }

            // Go through every key on the object,
            // 如果不是数组的情况，也就是json对象的情况
        } else {
            for (i in elems) {
                value = callback(elems[i], i, arg);

                if (value != null) {
                    ret[ret.length] = value;
                }
            }
        }

        // Flatten any nested arrays
        // 最后将数组扁平化，即不要产生嵌套数组
        return core_concat.apply([], ret);
    },

    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    // elems：元素
    // fn：方法名
    // key:参数1，key
    // value:参数2，value
    // chainable:为true设值；为false,取值
    // emptyGet:
    access: function (elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
            length = elems.length,
        // 没有key值，bulk为真
            bulk = key == null;

        // Sets many values
        // 设置多组值的情况:
        // 类似$('#div').css({background:'yellow',width:'300px'})
        if (jQuery.type(key) === "object") {
            // 将chainable设为true,
            chainable = true;
            // 遍历key,递归调用access方法
            for (i in key) {
                jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
            }

            // Sets one value
            // 设值单个值的情况，如果value不为undefined
        } else if (value !== undefined) {
            chainable = true;

            // 如果value不是function类型的

            if (!jQuery.isFunction(value)) {
                // 将raw设为true
                raw = true;
            }

            //bulk为真,没有key值的情况

            if (bulk) {
                // Bulk operations run against the entire set
                // 如果raw为true
                if (raw) {
                    // fn调用elems,并将value值传入
                    fn.call(elems, value);
                    // fn置为空
                    fn = null;

                    // ...except when executing function values
                    // 如果raw为false
                } else {
                    // fn的值赋予bulk
                    bulk = fn;
                    // fn等于bulk（即原fn函数）调用elem和value的参数的返回值
                    fn = function (elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }

            // 如果fn存在，fn循环调用这些参数：elems[i],key
            // raw是否为真，如果为真，第三个参数是value
            // raw如果不为真：第三个参数是value.call(elems[i], i, fn(elems[i], key))

            if (fn) {
                for (; i < length; i++) {
                    fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                }
            }
        }

        //设置or获取，chainable为true —— 设值；chainable为false —— 获取

        return chainable ?
            elems :

            // Gets
            // 获取，首先看key是否为null,为null fn调用elems;不为null进入下一个判断
            // length是否存在[length = elems.length]，存在的话直接返回第一个元素的key对应的value值；否则返回undefined
            bulk ?
                fn.call(elems) :
                length ? fn(elems[0], key) : emptyGet;
    },
    // A method for quickly swapping in/out CSS properties to get correct calculations.
    // Note: this method belongs to the css module but it's needed here for the support module.
    // If support gets modularized, this method should be moved back to the css module.
    swap: function (elem, options, callback, args) {
        var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        // 将旧样式存起来，将参数中的新样式赋给元素
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }

        // 调用callback方法
        ret = callback.apply(elem, args || []);

        // Revert the old values
        // 将存起来的旧样式赋给元素
        for (name in options) {
            elem.style[name] = old[name];
        }

        // 返回调用后的结果

        return ret;
    }
})