//Object.assign()
if (typeof Object.assign != 'function') {
    (function () {
        Object.assign = function (target) {
            'use strict';
            // We must check against these specific cases.
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}

//Object.setPrototypeOf
Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
        obj.__proto__ = proto;
        return obj;
    }

//Object.create
if (typeof Object.create != 'function') {
    Object.create = (function(undefined) {
        var Temp = function() {};
        return function (prototype, propertiesObject) {
            if(prototype !== Object(prototype) && prototype !== null) {
                throw TypeError('Argument must be an object, or null');
            }
            Temp.prototype = prototype || {};
            var result = new Temp();
            Temp.prototype = null;
            if (propertiesObject !== undefined) {
                Object.defineProperties(result, propertiesObject);
            }

            // to imitate the case of Object.create(null)
            if(prototype === null) {
                result.__proto__ = null;
            }
            return result;
        };
    })();
}
//Object.is()
if (!Object.is) {
    Object.is = function(x, y) {
        // SameValue algorithm
        if (x === y) { // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        } else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
        }
    };
}