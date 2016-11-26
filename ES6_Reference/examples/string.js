//获取字符串里的字符
return 'cat'[1]; // returns "a"
return 'cat'.charAt(1); // returns "a"

//字符串的比较
var a = 'a';
var b = 'b';
if (a < b) { // true
    console.log(a + ' is less than ' + b);
} else if (a > b) {
    console.log(a + ' is greater than ' + b);
} else {
    console.log(a + ' and ' + b + ' are equal.');
}

//----------------------------获取某个字符 or 根据字符返回下标---------------------
/*
1.str.charAt(index)
 */
var anyString = 'Brave new world';
console.log("The character at index 0   is '" + anyString.charAt()   + "'");
// No index was provided, used 0 as default

console.log("The character at index 0   is '" + anyString.charAt(0)   + "'");
console.log("The character at index 1   is '" + anyString.charAt(1)   + "'");
console.log("The character at index 2   is '" + anyString.charAt(2)   + "'");
console.log("The character at index 3   is '" + anyString.charAt(3)   + "'");
console.log("The character at index 4   is '" + anyString.charAt(4)   + "'");
console.log("The character at index 999 is '" + anyString.charAt(999) + "'");
/*
 The character at index 0   is 'B'
 The character at index 0   is 'B'
 The character at index 1   is 'r'
 The character at index 2   is 'a'
 The character at index 3   is 'v'
 The character at index 4   is 'e'
 The character at index 999 is ''
 */

/*
 2.str.charCodeAt(index) 返回当前位置的Unicode value
 */
'ABC'.charCodeAt(0); // returns 65
/*
3.str.codePointAt(pos) 返回指定位置的UTF-16 encoded code point value
 */
'ABC'.codePointAt(1);          // 66
/*
4.str.indexOf(searchValue[, fromIndex])
5.str.lastIndexOf(searchValue[, fromIndex])
 */
'Blue Whale'.indexOf('Blue');     // returns  0
'Blue Whale'.indexOf('Blute');    // returns -1
'Blue Whale'.indexOf('Whale', 0); // returns  5
'Blue Whale'.indexOf('Whale', 5); // returns  5
'Blue Whale'.indexOf('');         // returns  0
'Blue Whale'.indexOf('', 9);      // returns  9
'Blue Whale'.indexOf('', 10);     // returns 10
'Blue Whale'.indexOf('', 11);     // returns 10
'Blue Whale'.indexOf('blue'); // returns -1
'canal'.lastIndexOf('a');     // returns 3
'canal'.lastIndexOf('a', 2);  // returns 1
'canal'.lastIndexOf('a', 0);  // returns -1
'canal'.lastIndexOf('x');     // returns -1
'canal'.lastIndexOf('c', -5); // returns 0
'canal'.lastIndexOf('c', 0);  // returns 0
'canal'.lastIndexOf('');      // returns 5
'canal'.lastIndexOf('', 2);   // returns 2
'Blue Whale, Killer Whale'.lastIndexOf('blue'); // returns -1

var anyString = 'Brave new world';
console.log('The index of the first w from the beginning is ' + anyString.indexOf('w'));
// logs 8
console.log('The index of the first w from the end is ' + anyString.lastIndexOf('w'));
// logs 10
console.log('The index of "new" from the beginning is ' + anyString.indexOf('new'));
// logs 6
console.log('The index of "new" from the end is ' + anyString.lastIndexOf('new'));
// logs 6
//Example2：检查一个字母在字符串里出现的次数
var str = 'To be, or not to be, that is the question.';
var count = 0;
var pos = str.indexOf('e');
while (pos !== -1) {
    count++;
    pos = str.indexOf('e', pos + 1);
}
console.log(count); // displays 4

//--------------------分割字符串，获取子字符串---------------------------------
/*
 String.prototype.includes(searchString[, position]) 是否包含某个字符串
 String.prototype.split([separator[, limit]])字符串转数组
 String.prototype.substr(start [, length])
 String.prototype.substring(indexStart[, indexEnd])
 String.prototype.slice(beginSlice[, endSlice])
 */
//includes()
'Blue Whale'.includes('blue'); // returns false

var str = 'To be, or not to be, that is the question.';
console.log(str.includes('To be'));       // true
console.log(str.includes('question'));    // true
console.log(str.includes('nonexistent')); // false
console.log(str.includes('To be', 1));    // false
console.log(str.includes('TO BE'));       // false


//split()
function splitString(stringToSplit, separator) {
    var arrayOfStrings = stringToSplit.split(separator);
    console.log('The original string is: "' + stringToSplit + '"');
    console.log('The separator is: "' + separator + '"');
    console.log('The array has ' + arrayOfStrings.length + ' elements: ' + arrayOfStrings.join(' / '));
}
var tempestString = 'Oh brave new world that has such people in it.';
var monthString = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec';
var space = ' ';
var comma = ',';
splitString(tempestString, space);
splitString(tempestString);
splitString(monthString, comma);
/*
 The original string is: "Oh brave new world that has such people in it."
 The separator is: " "
 The array has 10 elements: Oh / brave / new / world / that / has / such / people / in / it.

 The original string is: "Oh brave new world that has such people in it."
 The separator is: "undefined"
 The array has 1 elements: Oh brave new world that has such people in it.

 The original string is: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec"
 The separator is: ","
 The array has 12 elements: Jan / Feb / Mar / Apr / May / Jun / Jul / Aug / Sep / Oct / Nov / Dec
 */

var names = 'Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ';
console.log(names);
var re = /\s*;\s*/;
var nameList = names.split(re);
console.log(nameList);
/*
 Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand
 [ "Harry Trump", "Fred Barney", "Helen Rigby", "Bill Abel", "Chris Hand " ]
 */

var myString = 'Hello World. How are you doing?';
var splits = myString.split(' ', 3);
console.log(splits);
//Hello,World.,How

var myString = 'Hello 1 word. Sentence number 2.';
var splits = myString.split(/(\d)/);
console.log(splits);
//[ 'Hello ', '1', ' word. Sentence number ', '2', '.' ]

var str = 'asdfghjkl';
var strReverse = str.split('').reverse().join(''); // 'lkjhgfdsa'
// split() returns an array on which reverse() and join() can be applied

//substr()
var str = 'abcdefghij';
console.log('(1, 2): '   + str.substr(1, 2));   // '(1, 2): bc'
console.log('(-3, 2): '  + str.substr(-3, 2));  // '(-3, 2): hi'
console.log('(-3): '     + str.substr(-3));     // '(-3): hij'
console.log('(1): '      + str.substr(1));      // '(1): bcdefghij'
console.log('(-20, 2): ' + str.substr(-20, 2)); // '(-20, 2): ab'
console.log('(20, 2): '  + str.substr(20, 2));  // '(20, 2): '

//substring()
var anyString = 'Mozilla';
// Displays 'Moz'
console.log(anyString.substring(0, 3));
console.log(anyString.substring(3, 0));
// Displays 'lla'
console.log(anyString.substring(4, 7));
console.log(anyString.substring(4));
console.log(anyString.substring(7, 4));
// Displays 'Mozill'
console.log(anyString.substring(0, 6));
// Displays 'Mozilla'
console.log(anyString.substring(0, 7));
console.log(anyString.substring(0, 10));


// Replaces oldS with newS in the string fullS
function replaceString(oldS, newS, fullS) {
    for (var i = 0; i < fullS.length; ++i) {
        if (fullS.substring(i, i + oldS.length) == oldS) {
            fullS = fullS.substring(0, i) + newS + fullS.substring(i + oldS.length, fullS.length);
        }
    }
    return fullS;
}
replaceString('World', 'Web', 'Brave New World');
//以上方法更好的做法
function replaceString(oldS, newS, fullS) {
    return fullS.split(oldS).join(newS);
}

//str.slice
var str1 = 'The morning is upon us.', // the length of str1 is 23.
    str2 = str1.slice(1, 8),
    str3 = str1.slice(4, -2),
    str4 = str1.slice(12),
    str5 = str1.slice(30);
console.log(str2); // OUTPUT: he morn
console.log(str3); // OUTPUT: morning is upon u
console.log(str4); // OUTPUT: is upon us.
console.log(str5); // OUTPUT: ""
var str = 'The morning is upon us.';
str.slice(-3);     // returns 'us.'
str.slice(-3, -1); // returns 'us'
str.slice(0, -1);  // returns 'The morning is upon us'


//--------------------------------正则查找替换字符串-------------------------------
/*
 String.prototype.match(regexp)
 返回值：An Array containing the entire match result and any parentheses-captured matched results; null if there were no matches.
 String.prototype.search(regexp)
 返回值：The index of the first match between the regular expression and the given string; if not found, -1.
 String.prototype.replace(regexp|substr, newSubStr|function)
 返回值：A new string with some or all matches of a pattern replaced by a replacement.
 */
//match(regexp)
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);
console.log(found);
// logs [ 'see Chapter 3.4.5.1',
//        'Chapter 3.4.5.1',
//        '.1',
//        index: 22,
//        input: 'For more information, see Chapter 3.4.5.1' ]

// 'see Chapter 3.4.5.1' is the whole match.
// 'Chapter 3.4.5.1' was captured by '(chapter \d+(\.\d)*)'.
// '.1' was the last value captured by '(\.\d)'.
// The 'index' property (22) is the zero-based index of the whole match.
// The 'input' property is the original string that was parsed.

var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp);
console.log(matches_array);
// ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']

var str = "Nothing will come of nothing.";
str.match();   // returns [""]

/*
 When the parameter is a string or a number, it is implicitly converted to a RegExp by using new RegExp(obj).
 If it is a positive number with a positive sign,the RegExp() method will ignore the positive sign.
 */
var str1 = "NaN means not a number. Infinity contains -Infinity and +Infinity in JavaScript.",
    str2 = "My grandfather is 65 years old and My grandmother is 63 years old.",
    str3 = "The contract was declared null and void.";
str1.match("number");   // "number" is a string. returns ["number"]
str1.match(NaN);        // the type of NaN is the number. returns ["NaN"]
str1.match(Infinity);   // the type of Infinity is the number. returns ["Infinity"]
str1.match(+Infinity);  // returns ["Infinity"]
str1.match(-Infinity);  // returns ["-Infinity"]
str2.match(65);         // returns ["65"]
str2.match(+65);        // A number with a positive sign. returns ["65"]
str3.match(null);       // returns ["null"]


//replace
//Example 1 : 替换函数
function replacer(match, p1, p2, p3, offset, string) {
    // p1 is nondigits, p2 digits, and p3 non-alphanumerics
    return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);//'abc - 12345 - #$*%'

//Example 2
var str = 'Twas the night before Xmas...';
var newstr = str.replace(/xmas/i, 'Christmas');
console.log(newstr);  // Twas the night before Christmas...

//Example 3
var re = /apples/gi;
var str = 'Apples are round, and apples are juicy.';
var newstr = str.replace(re, 'oranges');
console.log(newstr);  // oranges are round, and oranges are juicy.

//Example 4
var re = /(\w+)\s(\w+)/;
var str = 'John Smith';
var newstr = str.replace(re, '$2, $1');
console.log(newstr);  // Smith, John

//Example 5
function styleHyphenFormat(propertyName) {
    function upperToHyphenLower(match) {
        return '-' + match.toLowerCase();
    }
    return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
}
styleHyphenFormat('borderTop');//this returns 'border-top'.
var newString = propertyName.replace(/[A-Z]/g, '-' + '$&'.toLowerCase());  // won't work

//Example 6
function f2c(x) {
    function convert(str, p1, offset, s) {
        return ((p1 - 32) * 5/9) + 'C';
    }
    var s = String(x);
    var test = /(-?\d+(?:\.\d*)?)F\b/g;
    return s.replace(test, convert);
}

//Example 7
var str = 'x-x_';
var retArr = [];
str.replace(/(x_*)|(-)/g, function(match, p1, p2) {
    if (p1) { retArr.push({ on: true, length: p1.length }); }
    if (p2) { retArr.push({ on: false, length: 1 }); }
});
console.log(retArr);


//search
function testinput(re, str) {
    var midstring;
    if (str.search(re) != -1) {
        midstring = ' contains ';
    } else {
        midstring = ' does not contain ';
    }
    console.log(str + midstring + re);
}
//---------------------------------按照给定的次数重复字符串--------------------
/*
 String.prototype.repeat(count)
 */
'abc'.repeat(-1);   // RangeError
'abc'.repeat(0);    // ''
'abc'.repeat(1);    // 'abc'
'abc'.repeat(2);    // 'abcabc'
'abc'.repeat(3.5);  // 'abcabcabc' (count will be converted to integer)
'abc'.repeat(1/0);  // RangeError

({ toString: () => 'abc', repeat: String.prototype.repeat }).repeat(2);
// 'abcabc' (repeat() is a generic method)
//--------------------------------字符串比大小---------------------------------
/*
str.localeCompare(compareString[, locales[, options]])
 */
// The letter "a" is before "c" yielding a negative value
'a'.localeCompare('c'); // -2 or -1 (or some other negative value)

// Alphabetically the word "check" comes after "against" yielding a positive value
'check'.localeCompare('against'); // 2 or 1 (or some other positive value)

// "a" and "a" are equivalent yielding a neutral value of zero
'a'.localeCompare('a'); // 0

//-------------------------------返回unicode的标准形式-------------------------
/*
 str.normalize()
 */
// Initial string
// U+1E9B: LATIN SMALL LETTER LONG S WITH DOT ABOVE
// U+0323: COMBINING DOT BELOW
var str = '\u1E9B\u0323';


// Canonically-composed form (NFC)
// U+1E9B: LATIN SMALL LETTER LONG S WITH DOT ABOVE
// U+0323: COMBINING DOT BELOW
str.normalize('NFC'); // '\u1E9B\u0323'
str.normalize();      // same as above


// Canonically-decomposed form (NFD)
// U+017F: LATIN SMALL LETTER LONG S
// U+0323: COMBINING DOT BELOW
// U+0307: COMBINING DOT ABOVE
str.normalize('NFD'); // '\u017F\u0323\u0307'


// Compatibly-composed (NFKC)
// U+1E69: LATIN SMALL LETTER S WITH DOT BELOW AND DOT ABOVE
str.normalize('NFKC'); // '\u1E69'


// Compatibly-decomposed (NFKD)
// U+0073: LATIN SMALL LETTER S
// U+0323: COMBINING DOT BELOW
// U+0307: COMBINING DOT ABOVE
str.normalize('NFKD'); // '\u0073\u0323\u0307'

//-------------------------判断某个字符串是否以某个子字符串开始/结束-----------
/*
 String.prototype.startsWith(searchString[, position])
 String.prototype.endsWith(searchString[, position])
 */
//startswith
var str = 'To be, or not to be, that is the question.';
console.log(str.startsWith('To be'));         // true
console.log(str.startsWith('not to be'));     // false
console.log(str.startsWith('not to be', 10)); // true
//endsWith
var str = 'To be, or not to be, that is the question.';
console.log(str.endsWith('question.')); // true
console.log(str.endsWith('to be'));     // false
console.log(str.endsWith('to be', 19)); // true
//----------------------------------------去空格，转大小写--------------------
/*
 String.prototype.toLocaleLowerCase()
 String.prototype.toLocaleUpperCase()
 String.prototype.toLowerCase()
 String.prototype.toUpperCase()
 String.prototype.trim()
 */
console.log('ALPHABET'.toLowerCase()); // 'alphabet'
console.log('alphabet'.toUpperCase()); // 'ALPHABET'
console.log('alphabet'.toLocaleUpperCase()); // 'ALPHABET'
console.log('ALPHABET'.toLocaleLowerCase()); // 'alphabet'

//trim
var orig = '   foo  ';
console.log(orig.trim()); // 'foo'
// Another example of .trim() removing whitespace from just one side.
var orig = 'foo    ';
console.log(orig.trim()); // 'foo'
//----------------------------------------返回字符串的字面量------------------
/*
 String.prototype.valueOf()
 String.prototype.toString()
 这两个方法是相同的
 */
var x = new String('Hello world');
console.log(x.toString()); // logs 'Hello world'

var x = new String('Hello world');
console.log(x.valueOf()); // Displays 'Hello world'