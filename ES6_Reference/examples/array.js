var fruits = ["Apple", "Banana"];
console.log(fruits.length);  //��ȡ����ĳ���
var first = fruits[0];  //��ȡ��һ��Ԫ��
var last = fruits[fruits.length - 1];   //��ȡ���һ��Ԫ��
//����Ԫ��
fruits.forEach(function (item, index, array) {
    console.log(item, index);
});
//Array.prototype,��Array�������ӷ���
if (!Array.prototype.first) {
    Array.prototype.first = function() {
        return this[0];
    }
}
//����Array�Ĺ�����
Array[Symbol.species]; // function Array()
//������Ĺ���������ΪArray
class MyArray extends Array {
    static get [Symbol.species]() { return Array; }
}



//--------------------------------------------------����array----------------------------------------
//1.Array.from(arrayLike[, mapFn[, thisArg]])
/*
 ������
 arrayLike:һ��������(objects with a length property and indexed elements)���߿ɵ�������(objects where you can get its elements, such as Map and Set)
 mapFn��Array.from(obj, mapFn, thisArg) has the same result as Array.from(obj).map(mapFn, thisArg)
 */
//��Ԫ���д�������
console.log(Array.from("foo"));
//��Set�д�������
var s = new Set(["foo", window]);
Array.from(s);
//��Map�д�������
var m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m);// [[1, 2], [2, 4], [4, 8]]
//��һ��arraylike�����д�������
function f() {
    return Array.from(arguments);
}
f(1, 2, 3);// [1, 2, 3]
//ʹ�õڶ�������map����
Array.from([1, 2, 3], x => x + x);// [2, 4, 6]
Array.from({length: 5}, (v, k) => k);// [0, 1, 2, 3, 4]


//2.Array.of(element0[, element1[, ...[, elementN]]])
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]
//��Array(num)������
Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]


//------------------------------------------�ж�Array����-----------------------
// ������:Array.isArray(obj)
// all following calls return true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
// Little known fact: Array.prototype itself is an array:
Array.isArray(Array.prototype);

// all following calls return false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray({ __proto__: Array.prototype });



//---------------------------------------����������޸�--------------------------
/*
1.�������е�ֵ����ָ��λ�õ�ֵ
arr.copyWithin(target)
arr.copyWithin(target, start)
arr.copyWithin(target, start, end[������ĩβ])
*/
[1, 2, 3, 4, 5].copyWithin(-2);// [1, 2, 3, 1, 2]
[1, 2, 3, 4, 5].copyWithin(0, 3);// [4, 5, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(0, 3, 4);// [4, 2, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(-2, -3, -1);// [1, 2, 3, 3, 4]
[].copyWithin.call({length: 5, 3: 1}, 0, 3);// {0: 1, 3: 1, length: 5}

// ES6 Typed Arrays are subclasses of Array
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);// Int32Array [3, 4, 5, 4, 5]

// On platforms that are not yet ES6 compliant:
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);// Int32Array [4, 2, 3, 4, 5]

/*
2.�õ�һֵ�������
 arr.fill(value)
 arr.fill(value, start)
 arr.fill(value, start, end)
 */
var numbers = [1, 2, 3]
numbers.fill(1);// results in [1, 1, 1]
[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}

/*3.����ɾ����pop,push,shift,unshift,splice*/
//(1).�Ƴ�
//pop
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var popped = myFish.pop();
console.log(myFish); // ['angel', 'clown', 'mandarin' ]
console.log(popped); // 'sturgeon'
//shift
var shifted = myFish.shift();
console.log('myFish after: ' + myFish);
// "myFish after: clown,mandarin,surgeon"
console.log('Removed this element: ' + shifted);
// "Removed this element: angel"
//(2).����
//push
var sports = ['soccer', 'baseball'];
var total = sports.push('football', 'swimming');
console.log(sports); // ['soccer', 'baseball', 'football', 'swimming']
console.log(total);  // 4
//��pushģ��Merge
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];
Array.prototype.push.apply(vegetables, moreVegs);
console.log(vegetables); // ['parsnip', 'potato', 'celery', 'beetroot']
//ʹ��arrayLike������ģ������
var obj = {
    length: 0,
    addElem: function addElem (elem) {
        // obj.length is automatically incremented
        // every time an element is added.
        [].push.call(this, elem);
    }
};
// Let's add some empty objects just to illustrate.
obj.addElem({});
obj.addElem({});
console.log(obj.length);// �� 2

//unshift����pushһ������������call��apply����������arrayLike����
var arr = [1, 2];
arr.unshift(0); // result of call is 3, the new array length, arr is [0, 1, 2]
arr.unshift(-2, -1); // = 5, arr is [-2, -1, 0, 1, 2]
arr.unshift([-3]);// arr is [[-3], -2, -1, 0, 1, 2]
//(3).���Ӻ��Ƴ�
//splice
/*
 array.splice(start)
 array.splice(start, deleteCount)
 array.splice(start, deleteCount, item1, item2, ...)
 */
var myFish = ["angel", "clown", "mandarin", "surgeon"];
myFish.splice(2, 0, "drum");// myFish is ["angel", "clown", "drum", "mandarin", "surgeon"]
var myFish = ["angel", "clown", "trumpet", "surgeon"];
var removed = myFish.splice(0, 2, "parrot", "anemone", "blue");
// myFish is ["parrot", "anemone", "blue", "trumpet", "surgeon"]
// removed is ["angel", "clown"]

/*3.����sort������reverse */
//sort
/*
arr.sort()
arr.sort(compareFunction)
����compareFunction:Specifies a function that defines the sort order.
If omitted, the array is sorted according to each character's Unicode code point value, according to the string conversion of each element.
If compareFunction is supplied, the array elements are sorted according to the return value of the compare function. If a and b are two elements being compared, then:
1.If compareFunction(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.
2.If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
3.If compareFunction(a, b) is greater than 0, sort b to a lower index than a.
4.compareFunction(a, b) must always return the same value when given a specific pair of elements a and b as its two arguments. If inconsistent results are returned then the sort order is undefined.
*/
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
    return a - b;
});
console.log(numbers);// [1, 2, 3, 4, 5]

var items = [
    { name: 'Edward', value: 21 },
    { name: 'Sharpe', value: 37 },
    { name: 'And', value: 45 },
    { name: 'The', value: -12 },
    { name: 'Magnetic' },
    { name: 'Zeros', value: 37 }
];

// sort by value
items.sort(function (a, b) {
    if (a.value > b.value) {
        return 1;
    }
    if (a.value < b.value) {
        return -1;
    }
    // a must be equal to b
    return 0;
});

// sort by name
items.sort(function(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // names must be equal
    return 0;
});



var stringArray = ['Blue', 'Humpback', 'Beluga'];
var numericStringArray = ['80', '9', '700'];
var numberArray = [40, 1, 5, 200];
var mixedNumericArray = ['80', '9', '700', 40, 1, 5, 200];

function compareNumbers(a, b) {
    return a - b;
}

console.log('stringArray:', stringArray.join());
console.log('Sorted:', stringArray.sort());

console.log('numberArray:', numberArray.join());
console.log('Sorted without a compare function:', numberArray.sort());
console.log('Sorted with compareNumbers:', numberArray.sort(compareNumbers));

console.log('numericStringArray:', numericStringArray.join());
console.log('Sorted without a compare function:', numericStringArray.sort());
console.log('Sorted with compareNumbers:', numericStringArray.sort(compareNumbers));

console.log('mixedNumericArray:', mixedNumericArray.join());
console.log('Sorted without a compare function:', mixedNumericArray.sort());
console.log('Sorted with compareNumbers:', mixedNumericArray.sort(compareNumbers));

/*�����
 stringArray: Blue,Humpback,Beluga
 Sorted: Beluga,Blue,Humpback

 numberArray: 40,1,5,200
 Sorted without a compare function: 1,200,40,5
 Sorted with compareNumbers: 1,5,40,200

 numericStringArray: 80,9,700
 Sorted without a compare function: 700,80,9
 Sorted with compareNumbers: 9,80,700

 mixedNumericArray: 80,9,700,40,1,5,200
 Sorted without a compare function: 1,200,40,5,700,80,9
 Sorted with compareNumbers: 1,5,9,40,80,200,700
* */

//ʹ��map��sort
// the array to be sorted
var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

// temporary array holds objects with position and sort-value
var mapped = list.map(function(el, i) {
    return { index: i, value: el.toLowerCase() };
})

// sorting the mapped array containing the reduced values
mapped.sort(function(a, b) {
    return +(a.value > b.value) || +(a.value === b.value) - 1;
});

// container for the resulting order
var result = mapped.map(function(el){
    return list[el.index];
});

//reverse
//reverse��sort�򵥵ö࣬û�в�����ֻ�ǽ�ԭ�����˳�򵹹������У��Ͳ������ˡ�


//--------------------------------------------------��ȡ������------------------------------------------
/*����:
  1.����Ԫ�ص��±�:indexOf(),lastIndexOf()
  2.��arrayת���ַ�����toString(),toLocaleString(),join()
  3.����ĺϲ�:concat()
  4.�������Ƭ����ȡ�����飩��slice()
  */


//--------------------------------------------------��������------------------------------------------
/*����:
 1.���������лص������Ĳ�������ˮ�߲���:forEach()��map()
 2.������������Ԫ���Ƿ���ϻص�������������every(),some(),filter(),find(),findIndex()
 3.����������һ����ֵ:reduce(),reduceRight()
 4.�����������entries(),keys(),values(),arr[Symbol.iterator]()
 */

