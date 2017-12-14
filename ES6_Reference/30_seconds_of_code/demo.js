/*********************************************************************String*********************************************************************/
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


/**
 * 字符串倒序
 * @param str
 * @returns {string}
 */
const reverseString = str => [...str].reverse().join('');
// reverseString('foobar') -> 'raboof'

/*********************************************************************Array*********************************************************************/
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
 * 数组合并
 * @param a
 * @param b
 * @returns {any[]}
 * union([1,2,3], [4,3,2]) -> [1,2,3,4]
 */
const union = (a, b) => Array.from(new Set([...a, ...b]))


/**
 * 数组的平均数
 * @param arr
 * @returns {number}
 * average([1,2,3]) -> 2
 */
const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;

/**
 * 数组去重
 * @param arr
 * @returns {*[]}
 * unique([1,2,2,3,4,4,5]) -> [1,2,3,4,5]
 */
const unique = arr => [...new Set(arr)];

/**
 * 去掉第一个元素
 * @param arr
 * @returns {*}
 * tail([1]) -> [1]
 * tail([1,2,3]) -> [2,3]
 */

const tail = arr => arr.length > 1 ? arr.slice(1) : arr;

/**
 * 交换两个变量
 * @type {*[]}
 */
[varA, varB] = [varB, varA];
// [x, y] = [y, x]

/**
 * 数组求和
 * @param arr
 * sum([1,2,3,4]) -> 10
 */
const sum = arr => arr.reduce((acc, val) => acc + val, 0);
//

/**
 * 整理string的字符组合
 * @param str
 * @returns {string}
 */
const sortCharactersInString = str =>
    str.split('').sort((a, b) => a.localeCompare(b)).join('');
// sortCharactersInString('cabbage') -> 'aabbceg'

/**
 *
 * @param arr
 * @param values
 * similarity([1,2,3], [1,2,4]) -> [1,2]
 */
const similarity = (arr, values) => arr.filter(v => values.includes(v));

/**
 * 随机一个数组
 * @param arr
 */
const shuffle = arr => {
    let r = arr.map(Math.random);
    return arr.sort((a, b) => r[a] - r[b]);
};
// shuffle([1,2,3]) -> [2, 1, 3]


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

/****************************************************************************************************************************/

/**
 * 底部是否可见
 * @param _
 * @returns {boolean|number}
 * bottomVisible() -> true
 */
const bottomVisible = _ =>
    document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight || document.documentElement.clientHeight;


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
 */
const uuid = _ =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
// uuid() -> '7982fcfe-5721-4632-bede-6000885be57d'

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
