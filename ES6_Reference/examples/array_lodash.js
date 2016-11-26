/**
 * Created by Administrator on 2016/11/15.
 */
/*
分割数组：_.chunk(array, [size=1])
参数：[size=1] (number): The length of each chunk
 */
_.chunk(['a', 'b', 'c', 'd'], 2);// => [['a', 'b'], ['c', 'd']]
_.chunk(['a', 'b', 'c', 'd'], 3);// => [['a', 'b', 'c'], ['d']]

/*去除所有falsy元素:_.compact(array)
The values false, null, 0, "", undefined, and NaN are falsey.
 */
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]

/*增加元素：_.concat(array, [values])
 */
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);
console.log(other);// => [1, 2, 3, [4]]

/*填充元素：_.fill(array, value, [start=0], [end=array.length])
 */
var array = [1, 2, 3];
_.fill(array, 'a');
console.log(array);// => ['a', 'a', 'a']
_.fill(Array(3), 2);// => [2, 2, 2]
_.fill([4, 6, 8, 10], '*', 1, 3);// => [4, '*', '*', 10]

/*删除元素：
_.drop(array, [n=1])
 _.dropRight(array, [n=1])
 _.dropWhile(array, [predicate=_.identity])
 _.dropRightWhile(array, [predicate=_.identity])
 */
_.drop([1, 2, 3]);// => [2, 3]
_.drop([1, 2, 3], 2);// => [3]
_.drop([1, 2, 3], 5);// => []
_.drop([1, 2, 3], 0);// => [1, 2, 3]
_.dropRight([1, 2, 3]);// => [1, 2]
_.dropRight([1, 2, 3], 2);// => [1]
_.dropRight([1, 2, 3], 5);// => []
_.dropRight([1, 2, 3], 0);// => [1, 2, 3]

/*
找出数组中与第二个参数的不同项：
_.difference(array, [values])
找出数组中与第二个参数的不同项，与上者不同的是这里是经过第三个参数计算的值：
_.differenceBy(array, [values], [iteratee=_.identity])
_.differenceWith(array, [values], [comparator])
找出几个数组中的相同项：
_.intersection([arrays])
_.intersectionBy([arrays], [iteratee=_.identity])
_.intersectionWith([arrays], [comparator])
 */
_.difference([2, 1], [2, 3]);// => [1]
_.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);// => [1.2]
// The `_.property` iteratee shorthand.
_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');// => [{ 'x': 2 }]

var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
_.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);// => [{ 'x': 2, 'y': 1 }]

_.intersection([2, 1], [2, 3]);// => [2]
_.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);// => [2.1]
// The `_.property` iteratee shorthand.
_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');// => [{ 'x': 1 }]

var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
_.intersectionWith(objects, others, _.isEqual);// => [{ 'x': 1, 'y': 2 }]



/*
 查找并返回下标：
 _.findIndex(array, [predicate=_.identity], [fromIndex=0])
 从右往左找：_.findLastIndex(array, [predicate=_.identity], [fromIndex=array.length-1])
 查找数组中的元素值并返回下标：_.indexOf(array, value, [fromIndex=0])
 从右往左找：_.lastIndexOf(array, value, [fromIndex=array.length-1])
 */
var users = [
    { 'user': 'barney',  'active': false },
    { 'user': 'fred',    'active': false },
    { 'user': 'pebbles', 'active': true }
];
_.findIndex(users, function(o) { return o.user == 'barney'; });// => 0
// The `_.matches` iteratee shorthand.
_.findIndex(users, { 'user': 'fred', 'active': false });// => 1
// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ['active', false]);// => 0
// The `_.property` iteratee shorthand.
_.findIndex(users, 'active');// => 2

_.findLastIndex(users, function(o) { return o.user == 'pebbles'; });// => 2
// The `_.matches` iteratee shorthand.
_.findLastIndex(users, { 'user': 'barney', 'active': true });// => 0
// The `_.matchesProperty` iteratee shorthand.
_.findLastIndex(users, ['active', false]);// => 2
// The `_.property` iteratee shorthand.
_.findLastIndex(users, 'active');// => 0

_.indexOf([1, 2, 1, 2], 2);// => 1
// Search from the `fromIndex`.
_.indexOf([1, 2, 1, 2], 2, 2);// => 3
_.lastIndexOf([1, 2, 1, 2], 2);// => 3
// Search from the `fromIndex`.
_.lastIndexOf([1, 2, 1, 2], 2, 2);// => 1


/*
返回一个扁平的数组：
_.flatten(array)
_.flattenDeep(array)
_.flattenDepth(array, [depth=1])
 */
_.flatten([1, [2, [3, [4]], 5]]);// => [1, 2, [3, [4]], 5]
_.flattenDeep([1, [2, [3, [4]], 5]]);// => [1, 2, 3, 4, 5]
var array = [1, [2, [3, [4]], 5]];
_.flattenDepth(array, 1);// => [1, 2, [3, [4]], 5]
_.flattenDepth(array, 2);// => [1, 2, 3, [4], 5]

/*
将数组转为object:_.fromPairs(pairs)
 */
_.fromPairs([['a', 1], ['b', 2]]);// => { 'a': 1, 'b': 2 }

/*
返回数组的第一个值：_.head(array)
返回数组的最后一个值：_.last(array)
返回数组的第N个值：_.nth(array, [n=0])
 */
_.head([1, 2, 3]);// => 1
_.head([]);// => undefined
_.last([1, 2, 3]);// => 3
var array = ['a', 'b', 'c', 'd'];
_.nth(array, 1);// => 'b'
_.nth(array, -2);// => 'c';




/*
 返回数组除了最后一个值以外的其他值：_.initial(array)
 */
_.initial([1, 2, 3]);// => [1, 2]

/*
相当于原生的join:_.join(array, [separator=','])
 */
_.join(['a', 'b', 'c'], '~');// => 'a~b~c'