/*********************************************************************     String         *********************************************************************/
/*
*
*/
/**
 * 字母的各种组合
 * @param str
 * @returns {*[]}
 * anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']
 */
const anagrams = str => {
    if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
    return str.split('').reduce((acc, letter, i) =>
        acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
};


/**
 * 整理string的字符组合
 * @param str
 * @returns {string}
 */
const sortCharactersInString = str =>
    str.split('').sort((a, b) => a.localeCompare(b)).join('');
// sortCharactersInString('cabbage') -> 'aabbceg'

/**
 * 字符串倒序
 * @param str
 * @returns {string}
 */
const reverseString = str => [...str].reverse().join('');
// reverseString('foobar') -> 'raboof'

/*=====================================================格式===============================================*/
/**
 * 每个单词首字母大写
 * @param str
 * @returns {string | * | void}
 */
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
// capitalizeEveryWord('hello world!') -> 'Hello World!'

/**
 * 第一个字母大写
 * @param str
 * @param lowerRest
 * @returns {string}
 * capitalize('myName', true) -> 'Myname'
 */
const capitalize = (str, lowerRest = false) =>
    str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));


/**
 * 字符串超过长度省略
 * @param str
 * @param num
 * @returns {string}
 * truncate('boomerang', 7) -> 'boom...'
 */
const truncate = (str, num) =>
    str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;




/*********************************************************************       Array          *********************************************************************/
/*
*
*/

/**
 * 找出数组的不同
 * @param a
 * @param b
 * difference([1,2,3], [1,2]) -> [3]
 */
const difference = (a, b) => { const s = new Set(b); return a.filter(x => !s.has(x)); }

/**
 * 找出数组的相同
 * @param a
 * @param b
 * intersection([1,2,3], [4,3,2]) -> [2,3]
 */
const intersection = (a, b) => { const s = new Set(b); return a.filter(x => s.has(x)); }


/**
 * 找出两个数组的相似之处
 * @param arr
 * @param values
 * similarity([1,2,3], [1,2,4]) -> [1,2]
 */
const similarity = (arr, values) => arr.filter(v => values.includes(v));

/**
 * 去掉第一个元素
 * @param arr
 * @returns {*}
 * tail([1]) -> [1]
 * tail([1,2,3]) -> [2,3]
 */
const tail = arr => arr.length > 1 ? arr.slice(1) : arr;
/**
 * 去掉最后一个元素
 * @param arr
 * initial([1,2,3]) -> [1,2]
 */
const initial = arr => arr.slice(0, -1);
//

/**
 * 返回数组的第一个元素
 * head([1,2,3]) -> 1
 */
const head = arr => arr[0];

/**
 * 返回array中的最后一个值
 * @param arr
 * last([1,2,3]) -> 3
 */
const last = arr => arr.slice(-1)[0];



/**
 * 初始化一个递增数组，结束的值必须给出，开始值默认为0
 * @param end
 * @param start
 * @returns {number[]}
 * initializeArrayRange(5) -> [0,1,2,3,4]
 */
const initializeArrayRange = (end, start = 0) =>
    Array.apply(null, Array(end - start)).map((v, i) => i + start);


/**
 * 初始化一个array,
 * @param n——次数
 * @param value——array值
 * @returns {any[]}
 * initializeArray(5, 2) -> [2,2,2,2,2]
 */
const initializeArray = (n, value = 0) => Array(n).fill(value);

/**
 * 斐波那契数列生成
 * @param n
 * @returns {any}
 * fibonacci(5) -> [0,1,1,2,3]
 */
const fibonacci = n =>
    Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);

/**
 * 数组求和
 * @param arr
 * sum([1,2,3,4]) -> 10
 */
const sum = arr => arr.reduce((acc, val) => acc + val, 0);



/**
 * 数组合并
 * @param a
 * @param b
 * @returns {any[]}
 * union([1,2,3], [4,3,2]) -> [1,2,3,4]
 */
const union = (a, b) => Array.from(new Set([...a, ...b]))

/**
 * 数组去重
 * @param arr
 * @returns {*[]}
 * unique([1,2,2,3,4,4,5]) -> [1,2,3,4,5]
 */
const unique = arr => [...new Set(arr)];

/**
 * 筛选出数组中独特的值
 * @param arr
 */
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
// filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]



/**
 * 数组的平均数
 * @param arr
 * @returns {number}
 * average([1,2,3]) -> 2
 */
const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;

/**
 * 返回数组的中位数，如果数组的长度是偶数则返回平均值
 * @param arr
 * @returns {number}
 */
const median = arr => {
    const mid = Math.floor(arr.length / 2), nums = arr.sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
// median([5,6,50,1,-5]) -> 5
// median([0,10,-2,7]) -> 3.5

/**
 * 扁平化数组
 * @param arr
 */
const flatten = arr => arr.reduce((a, v) => a.concat(v), []);
// flatten([1,[2],3,4]) -> [1,2,3,4]


/**
 * 深度扁平化数组
 * @param arr
 */
const deepFlatten = arr =>
    arr.reduce((a, v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), []);
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]






/**
 * 返回数组的最小值
 * @param arr
 * @returns {number}
 * arrayMin([10, 1, 5]) -> 1
 */
const arrayMin = arr => Math.min(...arr);

/**
 * 返回数组的最大值
 * @param arr
 * @returns {number}
 * arrayMax([10, 1, 5]) -> 10
 */
const arrayMax = arr => Math.max(...arr);







/**
 * 随机排序一个数组
 * @param arr
 */
const shuffle = arr => {
    let r = arr.map(Math.random);
    return arr.sort((a, b) => r[a] - r[b]);
};
// shuffle([1,2,3]) -> [2, 1, 3]

/**
 * 在数组里挑选一些值出来
 * @param obj
 * @param arr
 */
const pick = (obj, arr) =>
    arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
// pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']) -> { 'a': 1, 'c': 3 }
// pick(object, ['a', 'c'])['a'] -> 1


/**
 * 数组中低于value的百分比
 * @param arr
 * @param val
 * @returns {number}
 */
const percentile = (arr, val) =>
    100 * arr.reduce((acc,v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0) / arr.length;
// percentile([1,2,3,4,5,6,7,8,9,10], 6) -> 55


/**
 * 将一个数组的各种组合罗列出来
 * @param arr
 */
const powerset = arr =>
    arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
// powerset([1,2]) -> [[], [1], [2], [2,1]]


/**
 * 对象变成数组
 * @param obj
 * @returns {*[][]}
 */
const objectToPairs = obj => Object.keys(obj).map(k => [k, obj[k]]);
// objectToPairs({a: 1, b: 2}) -> [['a',1],['b',2]])

/**
 * 数组变成对象
 * @param arr
 */
const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {});
// objectFromPairs([['a',1],['b',2]]) -> {a: 1, b: 2}

/**
 * 统计元素在数组中出现的次数
 * @param arr
 * @param value
 */
const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
// countOccurrences([1,1,2,1,2,3], 1) -> 3

/**
 * 将数组分割成几部分
 * @param arr
 * @param size
 * @returns {any[]}
 */
const chunk = (arr, size) =>
    Array.apply(null, {length: Math.ceil(arr.length / size)}).map((v, i) => arr.slice(i * size, i * size + size));
// chunk([1,2,3,4,5], 2) -> [[1,2],[3,4],5]

/*************************************************************          util           ***************************************************************/

/**
 * 底部是否可见
 * @param _
 * @returns {boolean|number}
 * bottomVisible() -> true
 */
const bottomVisible = _ =>
    document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight || document.documentElement.clientHeight;




/**
 * 默认值
 * @param value
 * @param d
 * @returns {*}
 * valueOrDefault(NaN, 30) -> 30
 */
const valueOrDefault = (value, d) => value || d;


/**
 * 验证是否是有效的数字
 * @param n
 * @returns {boolean}
 * validateNumber('10') -> true
 */
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

/**
 * Use crypto API to generate a UUID, compliant with RFC4122 version 4.
 * 生成UUID
 * @param _
 * @returns {string | * | void}
 * uuid() -> '7982fcfe-5721-4632-bede-6000885be57d'
 */
const uuid = _ =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );


/**
 * URL parameters
 * 解析URL参数
 * @param url
 * getUrlParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}
 */
const getUrlParameters = url =>
    url.match(/([^?=&]+)(=([^&]*))?/g).reduce(
        (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
    );

/**
 * 重定向url
 *  Pass a second argument to simulate a link click (true - default) or an HTTP redirect (false).
 * @param url
 * @param asLink
 */
const redirect = (url, asLink = true) =>
    asLink ? window.location.href = url : window.location.replace(url);
// redirect('https://google.com')

/**
 * 返回当前url
 * @param _
 * @returns {string}
 */
const currentUrl = _ => window.location.href;
// currentUrl() -> 'https://google.com'

/**
 * 生成随机数
 * @param min
 * @param max
 * @returns {*}
 */
const randomInRange = (min, max) => Math.random() * (max - min) + min;
// randomInRange(2,10) -> 6.0211363285087005

const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// randomIntegerInRange(0, 5) -> 2

/**
 *
 * @param _
 */
const scrollToTop = _ => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};
// scrollToTop()

/**
 * 获取滚动的位置
 * @param el
 * @returns {{x: number, y: number}}
 */
const getScrollPos = (el = window) =>
    ({x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
        y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop});
// getScrollPos() -> {x: 0, y: 200}


/**
 * Run promises in series
 * @param ps
 */
const series = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
// const delay = (d) => new Promise(r => setTimeout(r, d))
// series([() => delay(1000), () => delay(2000)]) -> executes each promise sequentially, taking a total of 3 seconds to complete


/**
 * Promisify
 Use currying to return a function returning a Promise that calls the original function.
 Use the ...rest operator to pass in all the parameters.
 * @param func
 * @returns {function(...[*]): Promise<any>}
 */

const promisify = func =>
    (...args) =>
        new Promise((resolve, reject) =>
            func(...args, (err, result) =>
                err ? reject(err) : resolve(result))
        );
// const delay = promisify((d, cb) => setTimeout(cb, d))
// delay(2000).then(() => console.log('Hi!')) -> Promise resolves after 2s

/**
 * 测量方法运行的时间
 * @param callback
 * @returns {*}
 */
const timeTaken = callback => {
    const t0 = performance.now(), r = callback();
    console.log(performance.now() - t0);
    return r;
};
// timeTaken(() => Math.pow(2, 10)) -> 1024 (0.010000000009313226 logged in console)

/**
 * 返回对象的构造器
 * @param v
 * @returns {string}
 */
const getType = v =>
    v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
// getType(new Set([1,2,3])) -> "set"

/**
 * 判断数字是否是奇偶数
 * @param num
 * @returns {boolean}
 */
const isEven = num => Math.abs(num) % 2 === 0;
// isEven(3) -> false

/**
 * 是否可以被除尽
 * @param dividend
 * @param divisor
 * @returns {boolean}
 */
const isDivisible = (dividend, divisor) => dividend % divisor === 0;
// isDivisible(6,3) -> true

/**
 * 求两个点之间的距离
 * @param x0
 * @param y0
 * @param x1
 * @param y1
 * @returns {number}
 */
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
// distance(1,1, 2,3) -> 2.23606797749979

/**
 * 阶乘
 * @param n
 * @returns {number}
 * factorial(6) -> 720
 */
const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);

/**
 * 交换两个变量
 * @type {*[]}
 */
[varA, varB] = [varB, varA];
// [x, y] = [y, x]


/**
 *
 * @param fns
 * chainAsync([
 next => { console.log('0 seconds'); setTimeout(next, 1000); },
 next => { console.log('1 second');  setTimeout(next, 1000); },
 next => { console.log('2 seconds'); }
 ])
 */
const chainAsync = fns => { let curr = 0; const next = () => fns[curr++](next); next(); };

const curry = (f, arity = f.length, next) =>
    (next = prevArgs =>
            nextArg => {
                const args = [ ...prevArgs, nextArg ];
                return args.length >= arity ? f(...args) : next(args);
            }
    )([]);
// curry(Math.pow)(2)(10) -> 1024
// curry(Math.min, 3)(10)(50)(2) -> 2