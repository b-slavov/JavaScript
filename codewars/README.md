## 01. A square of squares

Given an integral number, determine if it's a square number:

In mathematics, a square number or perfect square is an integer that is the square of an integer. In other words, it is the product of some integer with itself.

Examples:

```javascript
isSquare(-1) // false
isSquare(3)  // false
isSquare(4)  // true
isSquare(25) // true
isSquare(26) // false
```

<details>
  <summary>Solution 1</summary>

```javascript
var isSquare = function(n) {
	return Math.sqrt(n) % 1 === 0;
}
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
var isSquare = function(n) {
	return Number.isInteger(Math.sqrt(n));
}
```
</details>

## 02. Binary count

Write a function that takes an (unsigned) integer as input, and returns the number of bits that are equal to one in the binary representation of that number.

Example:

```javascript
countBits(1234) // 1234 = 10011010010 in binary, so the function's output should be 5
```

<details>
  <summary>Solution 1</summary>

```javascript
var countBits = function(n) {
	return n.toString(2).split('1').length - 1;
}
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
var countBits = function(n) {
	return n.toString(2).replace(/0/g,'').length;
}
```
</details>

## 03. Member's title

To be a senior, a member must be at least 55 years old and have a handicap greater than 7. In this croquet club, handicaps range from -2 to +26; the better the player the lower the handicap.

```javascript
[[18, 20],[45, 2],[61, 12],[37, 6],[21, 21],[78, 9]]
// ["Open", "Open", "Senior", "Open", "Open", "Senior"]
```

<details>
  <summary>Solution 1</summary>

```javascript
function openOrSenior(data) {
	return data.map(([age, handicap]) => (age > 54 && handicap > 7) ? 'Senior' : 'Open');
}
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
function openOrSenior(data) {
	var result = [];
	data.forEach(function(member) {
		if(member[0] >= 55 && member[1] > 7) {
			result.push('Senior');
		} else {
			result.push('Open');
		}
	});
	return result;
}
```
</details>

## 04. Smallest integer in the array

Given an array of integers your solution should find the smallest integer. 

```javascript
[34, 15, 88, 2] // 2
```

<details>
  <summary>Solution 1</summary>

```javascript
findSmallestInt(args) {
	return Math.min(...args);
}
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
findSmallestInt(args) {
	return Math.min.apply(Math, args);
}
```
</details>

## 05. Anagrams

What is an anagram? Well, two words are anagrams of each other if they both contain the same letters. For example:

```javascript
'abba' & 'baab' == true
'abba' & 'bbaa' == true
'abba' & 'abbba' == false
```

Write a function that will find all the anagrams of a word from a list. You will be given two inputs a word and an array with words. You should return an array of all the anagrams or an empty array if there are none. For example:

```javascript
anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) // ['aabb', 'bbaa']
anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) // ['carer', 'racer']
anagrams('laser', ['lazing', 'lazy',  'lacer']) // []
```

<details>
  <summary>Solution 1</summary>

```javascript
let anagrams = (word, words) => words.filter(w => w.split('').sort().join('') === word.split('').sort().join(''));
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
function anagrams(word, words) {
	return words.filter(function (e) {
		return e.split('').sort().join('') === word.split('').sort().join('');
	})
}
```
</details>

## 06. Rectangle into Squares

The drawing below gives an idea of how to cut a given "true" rectangle into squares ("true" rectangle meaning that the two dimensions are different).

![alt text](https://github.com/b-slavov/JavaScript/blob/master/codewars/rectangle-into-squares.jpg "rectangle into sqares")

Can you translate this drawing into an algorithm?

You will be given two dimensions:

 * a positive integer length (parameter named lng)
 * a positive integer width (parameter named wdth)

You will return an array with the size of each of the squares.

```javascript
sqInRect(5, 3) // [3, 2, 1, 1]
sqInRect(3, 5) // [3, 2, 1, 1]
sqInRect(5, 5) // null
```
#Note: lng == wdth as a starting case would be an entirely different problem and the drawing is planned to be interpreted with lng != wdth. 

<details>
  <summary>Solution 1</summary>

```javascript
function sqInRect(lng, wdth) {
	let arr = []
	if(lng === wdth) return null
	while(lng > 0 && wdth > 0) {
		arr.push(lng > wdth ? wdth : lng)
		lng > wdth ? lng -= wdth : wdth -= lng
	}
	return arr
}
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
function sqInRect(lng, wdth) {
	var result = [];
	var a, b;
	if (lng === wdth) {
		return null;
	} else {
		while (lng > 0) {
			a = lng;
			b = wdth;
			lng = Math.max(a, b); 
			wdth = Math.min(a, b);
			result.push(wdth);
			lng -= wdth;
		}
		return result;
	}
}
```
</details>

## 07. Find The Parity Outlier

You are given an array (which will have a length of at least 3, but could be very large) containing integers. The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single integer N. Write a method that takes the array as an argument and returns N.

For example:

```javascript
findOutlier([2, 4, 0, 100, 4, 11, 2602, 36]) // 11
findOutlier([160, 3, 1719, 19, 11, 13, -21]) // 160
```

<details>
  <summary>Solution 1</summary>

```javascript
function findOutlier(integers) {
	var odds = integers.filter(x => x % 2 !== 0);
	var evens = integers.filter(x => x % 2 === 0);

	if (odds.length === 1) {
		return odds[0];
	} else {
		return evens[0];
	}
}
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
function findOutlier(int){
	var even = int.filter(a=>a%2==0);
	var odd = int.filter(a=>a%2!==0);
	return even.length==1? even[0] : odd[0];
}
```
</details>

## 08. Triple double trouble

Write a function which takes in numbers num1 and num2 and returns 1 if there is a straight triple of a number at any place in num1 and also a straight double of the same number in num2. If this isn't the case, return 0.

For example:

```javascript
tripledouble(451999277, 41177722899) == 1 // num1 has straight triple 999s and
										  // num2 has straight double 99s
tripledouble(1222345, 12345) == 0 // num1 has straight triple 2s but num2 has only a single 2
tripledouble(666789, 12345667) == 1
tripledouble(12345, 12345) == 0
```

<details>
  <summary>Solution 1</summary>

```javascript
function tripledouble(num1, num2) {
	for (let i = 0; i < 10; i++) {
		if (new RegExp(`${i}{3}`).test(num1) && new RegExp(`${i}{2}`).test(num2)) {
			return 1;
		}
	}
	return 0;
}
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
function tripledouble(num1, num2) {
	let nums = [...Array(10).keys()];

	return +nums.some(num => 
		num1.toString().includes(num.toString().repeat(3)) &&
		num2.toString().includes(num.toString().repeat(2))
	);
}
```
</details>

<details>
  <summary>Solution 3</summary>

```javascript
function tripledouble(num1, num2) {
	return ~~/(.)(\1{2})(?=.*?,.*?\1{2})/.test(num1 + "," + num2);
}
```
</details>

<details>
  <summary>Solution 4</summary>

```javascript
function tripledouble(num1, num2) {
	return /(\d)\1{2}.*_.*\1\1/.test(num1 + "_" + num2) ? 1 : 0;
}
```
</details>

## 09. Passphrases

Everyone knows passphrases. One can choose passphrases from poems, songs, movies names and so on but frequently they can be guessed due to common cultural references. You can get your passphrases stronger by different means. One is the following: choose a text in capital letters including or not digits and non alphabetic characters,
1. shift each letter by a given number but the transformed letter must be a letter (circular shift),
2. replace each digit by its complement to 9,
3. keep such as non alphabetic and non digit characters,
4. downcase each letter in odd position, upcase each letter in even position (the first character is in position 0),
5. reverse the whole result.

Example:

```javascript
your text: "BORN IN 2015!", shift 1
1. + 2. + 3. -> "CPSO JO 7984!"
4. "CpSo jO 7984!"
5. "!4897 Oj oSpC"
```

<details>
  <summary>Solution 1</summary>

```javascript
function playPass(s, n) {
	return s
		.replace(/[A-Z]/g, l => String.fromCharCode((l.charCodeAt(0) + n - 65) % 26 + 65))
		.replace(/\d/g, d => 9 - d)
		.split('').map( (l,i) => (i % 2 == 0) ? l.toUpperCase() : l.toLowerCase() )
		.reverse().join('');
}
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
function playPass(s, n) {
	return s
		.replace(/[A-Z]/g, function(char) {
			return String.fromCharCode((char.charCodeAt(0) - 65 + n) % 26 + 65);
		})
		.replace(/[a-z]/g, function(char) {
			return String.fromCharCode((char.charCodeAt(0) - 97 + n) % 26 + 97);
		})
		.replace(/\d/g, function(digit) { 
			return 9 - digit; 
		})
		.replace(/(.)(.?)/g, function(match, odd, even) {
			return odd.toUpperCase() + even.toLowerCase();
		})
		.split('').reverse().join('');
}
```
</details>

## 10. Counting Duplicates

Count the number of Duplicates

Write a function that will return the count of distinct case-insensitive alphabetic characters and numeric digits that occur more than once in the input string. The input string can be assumed to contain only alphanumeric characters, including digits, uppercase and lowercase alphabets.

Example:

```javascript
"abcde" // 0 # no characters repeats more than once
"aabbcde" // 2 # 'a' and 'b'
"aabbcdeB" // 2 # 'a' and 'b'
"indivisibility" // 1 # 'i'
"Indivisibilities" // 2 # 'i' and 's'
"aa11" // 2 # 'a' and '1'
```

<details>
  <summary>Solution 1</summary>

```javascript
function duplicateCount(text) {
	return (text.toLowerCase().split('').sort().join('').match(/([^])\1+/g) || []).length;
}
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
function duplicateCount(text) {
	return new Set(text.toLowerCase().match(/(.)(?=.*\1)/gi)).size;
}
```
</details>

<details>
  <summary>Solution 3</summary>

```javascript
function duplicateCount(text) {
	var counts = {};
	var result = [];
	text.toLowerCase().split('').forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
	for (var x in counts) { if (counts[x] > 1) { result.push(counts[x]) } }
		return result.length;
}
```
</details>

## 11. Permutations

Create all permutations of an input string and remove duplicates, if present. This means, you have to shuffle all letters from the input in all possible orders.

Example:

```javascript
permutations('a'); // ['a']
permutations('ab'); // ['ab', 'ba']
permutations('aabb'); // ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
```

<details>
  <summary>Solution 1</summary>

```javascript
function permutations(text) {
    var result = [];
	var textLength = text.length;
    if (textLength < 2) return [text];
	
    for (var i=0; i < textLength; i++) {
        var letter = text[i];
        if (text.indexOf(letter) != i) continue; // Skip used letter
        var remainingString = text.slice(0, i) + text.slice(i + 1, textLength);
		
        for (var subPermutations of permutations(remainingString)) {
			result.push(letter + subPermutations)
		}
    }
	
    return result;
}
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
function permutations(string) {
	return (string.length == 1) ? [string] : string.split('').map(
		(e, i) => permutations(string.slice(0,i) + string.slice(i+1)).map((e2) => e+e2)
  	).reduce((r,e) => r.concat(e)).sort().filter((e,i,a) => (i==0) || a[i-1] != e);
}
```
</details>

<details>
  <summary>Solution 3</summary>

```javascript
function permutations(str) {
	return (str.length <= 1) ? [str] :
         Array.from(new Set(
           str.split('')
              .map((char, i) => permutations(str.substr(0, i) + str.substr(i + 1)).map(p => char + p))
              .reduce((r, x) => r.concat(x), [])
         ));
}
```
</details>

## 12. Sum of Pairs

Given a list of integers and a single sum value, return the first two values (parse from the left please) in order of appearance that add up to form the sum.

Example:

```javascript
sum_pairs([4, 3, 2, 3, 4], 6) // [4, 2]
sum_pairs([0, 0, -2, 3], 2) // undefined
sum_pairs([10, 5, 2, 3, 7, 5], 10) // [3, 7]
sum_pairs([0, 2, 0], 10) // [0, 0]
sum_pairs([5, 9, 13, -3], 10) // [13, -3]
```

<details>
  <summary>Solution 1</summary>

```javascript
var sum_pairs = function(ints, s) {
	var seen = {}
  	for (var i = 0; i < ints.length; i++) {
    	if (seen[s - ints[i]]) return [s - ints[i], ints[i]]
    	seen[ints[i]] = true
  	}
}
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
let sum_pairs = (a, s) => {
	let mem = {}
  	for(x of a) { 
    	if(mem[s - x]) {
      		return [s - x, x]
		} else { 
      		mem[x] = 1
		}
	}
}
```
</details>

## 13. Vector classs

Create a Vector object that supports addition, subtraction, dot products, and norms. So, for example:

```javascript
var a = new Vector([1,2,3]);
var b = new Vector([3,4,5]);
var c = new Vector([5,6,7,8]);
a.add(b); // should return Vector([4,6,8])
a.subtract(b); // should return Vector([-2,-2,-2])
a.dot(b); // should return 1*3+2*4+3*5 = 26
a.norm(); // should return sqrt(1^2+2^2+3^2)=sqrt(14)
a.add(c); // throws an error
```

If you try to add, subtract, or dot two vectors with different lengths, you must throw an error!

Also provide:
* a toString function, so that using the vectors from above, ```a.toString() === '(1,2,3)'```
* an equals function, so that two vectors who have the same components are equal

<details>
  <summary>Solution 1</summary>

```javascript
class Vector extends Array {
  constructor(components) {
    super()
    this.push(...components)
  }

  add(vector) {
    if (!sameComponents(this, vector))
      throw new TypeError('This vector is from a different dimension')

    const components = []
    for (let i = 0; i < vector.length; i++)
      components[i] = this[i] + vector[i]

    return new Vector(components)
  }

  subtract(vector) {
    if (!sameComponents(this, vector))
      throw new TypeError('This vector is from a different dimension')

    const components = []
    for (let i = 0; i < vector.length; i++)
      components[i] = this[i] - vector[i]

    return new Vector(components)
  }

  dot(vector) {
    if (!sameComponents(this, vector))
      throw new TypeError('This vector is from a different dimension')

    const multiple = []
    for (let i = 0; i < vector.length; i++)
      multiple[i] = this[i] * vector[i]

    return multiple.reduce((sum, item) => sum + item, 0)
  }

  norm() {
    return Math.sqrt(this.reduce((sum, item) => sum + item * item, 0))
  }

  equals(vector) {
    if (!sameComponents(this, vector))
      return false

    for (let i = 0; i < vector.length; i++)
      if (this[i] !== vector[i])
        return false

    return true
  }

  toString() {
    return `(${this.join(',')})`
  }
}

function sameComponents(a, b) {
  return a.length === b.length
}
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
var Vector = function (components) {
  this.x = components;
};

Vector.prototype.add = function(b) {
  var a = this.x
  b = b.x;
  if(a.length !== b.length) throw new TypeError("Vectors have different length");
  return new Vector(a.map(function(x,i) { return x + b[i]; }));
}

Vector.prototype.subtract = function(b) {
  var a = this.x;
  b = b.x;
  if(a.length !== b.length) throw new TypeError("Vectors have different length");
  return new Vector(a.map(function(x,i) { return x - b[i]; }));
}

Vector.prototype.dot = function(b) {
  var a = this.x;
  b = b.x;
  if(a.length !== b.length) throw new TypeError("Vectors have different length");
  return a.reduce(function(s,x,i) { return s + x * b[i]; },0);
}

Vector.prototype.equals = function(b) {
  var a = this.x;
  b = b.x;
  if(a.length !== b.length) return false;
  return a.every(function(x,i) { return x === b[i]; });
}

Vector.prototype.norm = function() {
  var a = this.x;
  return Math.sqrt(a.reduce(function(s,x) { return s + x*x }, 0));
}

Vector.prototype.toString = function() {
  return '(' + this.x.join(',') + ')';
}
```
</details>

## 14. Valid Parentheses

Write a function called validParentheses that takes a string of parentheses, and determines if the order of the parentheses is valid. validParentheses should return true if the string is valid, and false if it's invalid.

Examples:

```javascript
validParentheses( "()" ) // true 
validParentheses( ")(()))" ) // false 
validParentheses( "(" ) // false 
validParentheses( "(())((()())())" ) // true 
```

<details>
  <summary>Solution 1</summary>

```javascript
var validParentheses = function(s) {
	var pairs = {
		"\(" : "\)",
		"\{" : "\}",
		"\[" : "\]"
	}
	
	var open=[]
	for(var i = 0; i < s.length; i++){
		if(s[i] in pairs){
			open.push(s[i])
		}
		else {
			var current = open.pop()
			if(pairs[current] !== s[i]){
				return false
			}
		}
	}
	
	return open.length === 0
}
```
</details>

<details>
  <summary>Solution 2</summary>

```javascript
function validParentheses(parens) {
  var re = /\(\)/;
  while (re.test(parens)) parens = parens.replace(re, '');
  return !parens;
}
```
</details>

## 15. Large Factorials

In mathematics, the factorial of integer 'n' is written as 'n!'. It is equal to the product of n and every integer preceding it.

Example:

```javascript
5! = 1 x 2 x 3 x 4 x 5 = 120
```

For any values outside the positive range, return ```null```.

For positive numbers a full length number is expected as a String!

Example:

```javascript
500! = 1220136825991110068701238785423046926253574342803192842192413588385845373153881997605496447502203281863013616477148203584163378722078177200480785205159329285477907571939330603772960859086270429174547882424912726344305670173270769461062802310452644218878789465754777149863494367781037644274033827365397471386477878495438489595537537990423241061271326984327745715546309977202781014561081188373709531016356324432987029563896628911658974769572087926928871281780070265174507768410719624390394322536422605234945850129918571501248706961568141625359056693423813008856249246891564126775654481886506593847951775360894005745238940335798476363944905313062323749066445048824665075946735862074637925184200459369692981022263971952597190945217823331756934581508552332820762820023402626907898342451712006207714640979456116127629145951237229913340169552363850942885592018727433795173014586357570828355780158735432768888680120399882384702151467605445407663535984174430480128938313896881639487469658817504506926365338175055478128640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

Note: 0! is always equal to 1.

<details>
  <summary>Solution 1</summary>

```javascript
function factorial(n) {
	if (n < 0) return null;
	let result = '1';
	let temp;
	let digit;
	for (let i = 1; i <= n; i++) {
		let tempResult = '';
		let reminder = 0;
		for (let j = result.length - 1; j >= 0; j--) {
			digit = parseInt(result[j]);
			temp = (i * digit + reminder) % 10;
			reminder = Math.floor((i * digit + reminder) / 10);
			tempResult = temp.toString() + tempResult;
		}
		if (reminder > 0) {
			tempResult = reminder.toString() + tempResult;
		}
		result = tempResult;
	}
	return result;
}
```
</details>

## 16. Regex Password Validation

You need to write regex that will validate a password to make sure it meets the following criteria:

* at least six characters long
* contains a lowercase letter
* contains an uppercase letter
* contains a number

Example:

```javascript
validate('djI38D55') // true
validate('!fdjn345') // false
```

<details>
  <summary>Solution 1</summary>

```javascript
function validate(password) {
	return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[A-Za-z0-9]{6,}$/.test(password);
}
```
</details>
  <summary>Solution 2</summary>

```javascript
function validate(password) {
	return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)\w{6,}$/.test(password);
}
```
</details>

## 17. Sum Strings as Numbers

Given the string representations of two integers, return the string representation of the sum of those integers.

Example:

```javascript
sumStrings('1','2') // '3'
sumStrings('712569312664357328695151392', '8100824045303269669937') // 712577413488402631964821329
```

<details> 
  <summary>Solution 1</summary>

```javascript
function sumStrings(a, b) {
	a = a.replace(/^0+/, '');
	b = b.replace(/^0+/, '');
	let aLength = a.length;
	let bLength = b.length;
	if (aLength > bLength) {
		b = pad(b, aLength);
		bLength = aLength;
	}
	if (aLength < bLength) {
		a = pad(a, bLength);
		aLength = bLength;
	}
	let i = aLength - 1;
	let reminder = 0;
	let temp;
	let tempResult = '';
	for (i; i >= 0; i--) {
		temp = (parseInt(a[i]) + parseInt(b[i]) + reminder) % 10;
		reminder = Math.floor((parseInt(a[i]) + parseInt(b[i]) + reminder) / 10);
		tempResult = temp.toString() + tempResult;
	}
	if (reminder > 0) {
		tempResult = reminder.toString() + tempResult;
	}
	result = tempResult;
	return result;
}

function pad(n, width) {
	return new Array(width - n.length + 1).join('0') + n;
}
```
</details>

<details> 
  <summary>Solution 2</summary>

```javascript
function sumStrings(a, b) { 
	var res = '';
	var c = 0;
	a = a.split('');
	b = b.split('');
	
	while(a.length || b.length || c) {
		c = +(a.length > 0 ? a.pop() : 0) + +(b.length > 0 ? b.pop() : 0) + c;
		res = (c % 10).toString() + res;
		c = Math.floor(c / 10);
	}
	res = res.replace(/^[0]*/g,'');
	return res;
}
```
</details>

## 18. Square into Squares

Given a positive integral number n, return a strictly increasing sequence of numbers, so that the sum of the squares is equal to n². If there are multiple solutions (and there will be), return the result with the largest possible values.

Example:

```javascript
decompose(11) // return [1, 2, 4, 10]. Note that there are actually two ways to decompose 11², 11² = 121 = 1 + 4 + 16 + 100 = 1² + 2² + 4² + 10² but don't return [2,6,9], since 9 is smaller than 10.
decompose(50) // don't return [1, 1, 4, 9, 49] but [1, 3, 5, 8, 49] since [1, 1, 4, 9, 49] doesn't form a strictly increasing sequence.
```

Neither ```[n]``` nor ```[1, 1, 1, …, 1]``` are valid solutions. If no valid solution exists, return ```null```.

<details> 
  <summary>Solution 1</summary>

```javascript
function decompose(n) {
  return loop(n - 1, n * n, []);
  function loop(k, rest, path) {
    return (rest === 0) ? path :
           (rest < 0 || k === 0) ? null :
              loop(k - 1, rest - k * k, [k].concat(path)) ||
              loop(k - 1, rest, path);
  }
}
```
</details>

<details> 
  <summary>Solution 2</summary>

```javascript
function decompose(n, n2=n*n, i=n, prev) {
  while(n2>0 && i-->1) if (prev = decompose(n, n2-i*i, i)) return prev.concat([i]);
  return (n2 == 0) ? [] : null;
}
```
</details>

## 19. Longest Common Subsequence

Write a function called ```lcs``` that accepts two sequences, and returns the longest subsequence common to the passed in sequences. A subsequence is different from a substring. The terms of a subsequence need not be consecutive terms of the original sequence.

Example:

```javascript
lcs('abcdef', 'acf') // 'acf'
lcs('132535365', '123456789') // '12356'
```

<details> 
  <summary>Solution 1</summary>

```javascript
function lcs(x, y) {
  var yChar = y.split('');
  var start = 0;
  var arr = [];
  for(var i = 0; i < yChar.length; i++) {
    pos = x.indexOf(yChar[i], start);
    if (pos >= start) {
      arr.push(yChar[i]);
      start = pos + 1;
    }
  }
  return arr.join('');
}
```
</details>

<details> 
  <summary>Solution 2</summary>

```javascript
function lcs(xstr, ystr) {
  if(xstr == '' || ystr == '') return '';
    
  var xp = xstr.charAt(0), xrest = xstr.slice(1),
      yp = ystr.charAt(0), yrest = ystr.slice(1);
      
  if(xp == yp)
    return xp + lcs(xrest, yrest);
  
  var lcs1 = lcs(xstr, yrest),
      lcs2 = lcs(xrest, ystr);
      
  return (lcs1.length > lcs2.length) ? lcs1 : lcs2;
}
```
</details>

## 20. Range Extraction

A format for expressing an ordered list of integers is to use a comma separated list of either

* individual integers
* or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'. The range includes all integers in the interval including both endpoints. It is not considered a range unless it spans at least 3 numbers. For example ("12, 13, 15-17")

Complete the solution so that it takes a list of integers in increasing order and returns a correctly formatted string in the range format.

Example:

```javascript
solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
// '-6,-3-1,3-5,7-11,14,15,17-20'
```

<details> 
  <summary>Solution 1</summary>

```javascript
function solution(list) {
  var i,
    threshold = 3,
    range = [],
    result = [];
  for (i = 0; i < list.length; i++) {
    range.push(list[i]);
    if (range[range.length - 1] + 1 !== list[i + 1]) {
      if (range.length >= threshold) {
        result.push(range[0] + '-' + range[range.length - 1]);
      } else {
        while (range.length > 0) {
          result.push(range.shift());
        }
      }
      range = [];
    }
  }
  return result.join();
}
```
</details>

<details> 
  <summary>Solution 2</summary>

```javascript
function solution(list) {
   for(var i = 0; i < list.length; i++){
      var j = i;
      while(list[j] - list[j+1] == -1) j++;
      if(j != i && j-i>1) list.splice(i, j-i+1, list[i] +'-'+list[j]);
  }
  return list.join();
}
```
</details>