# JavaScript
![alt text](https://github.com/b-slavov/JavaScript/blob/master/js.png "JavaScript Logo")

## Scope

This is a set of variables, objects, and functions you have access to. JavaScript has function scope: The scope changes inside functions.

**Local JS variables**

They are created when a function starts, and deleted when the function is completed.

```javascript
// code here can not use carName
function myFunction() {
    var carName = "Mercedes"
    // code here can use carName
}
```

**Global JS variables**

A global variable has a **global scope** (the complete JavaScript environment). All scripts and functions on a web page can access it.

```javascript
var carName = "Mercedes"
// code here can use carName
function myFunction() {
    // code here can use carName 
}
```

**Automatically Global**

If you assign a value to a variable that has not been declared, it will automatically become a GLOBAL variable. This code example will declare a global variable carName, even if the value is assigned inside a function.

```javascript
myFunction();
// code here can use carName 
function myFunction() {
    carName = "Mercedes"
}
```

Do NOT create global variables unless you intend to! In **strict mode** automatically global variables will fail.

## Closures

JavaScript variables can belong to the local or global scope. Global variables can be made local (private) with closures.

```javascript
var add = (function () {
    var counter = 0
    return function () {
    	return counter += 1
    }
})()
add()
add()
add()
// counter = 3
```

The variable add is assigned the return value of a self-invoking function. The self-invoking function only runs once. It sets the counter to zero (0), and returns a function expression. This way add becomes a function. The "wonderful" part is that it can access the counter in the parent scope. This is called a JavaScript closure. It makes it possible for a function to have "private" variables. The counter is protected by the scope of the anonymous function, and can only be changed using the add function.

**A closure is a function having access to the parent scope, even after the parent function has closed.**


## Hoisting

This is JavaScript's default behavior of moving all declarations to the top of the current scope (to the top of the current script or the current function).

A variable can be used before it has been declared.

```javascript
x = 5 // Assign 5 to x
elem = document.getElementById('demo') // Find an element 
elem.innerHTML = x                     // Display x in the element
var x // Declare x
```

In the following example y will be undefined, because only the declaration (var y), not the initialization (=7) is hoisted to the top.

```javascript
var x = 5; // Initialize x
elem = document.getElementById("demo"); // Find an element 
elem.innerHTML = x + " " + y;           // Display x and y (y is undefined)
var y = 7; // Initialize y
```

In strict mode, JavaScript does not allow variables to be used if they are not declared. To avoid bugs, always declare all variables at the beginning of every scope.

## Event delegation

It allows you to avoid adding event listeners to specific nodes. Instead, the event listener is added to one parent. That event listener analyzes bubbled events to find a match on child elements.

**HTML**

```html
<html>
    <body>
	<ul id="parent-list">
	    <li id="post-1">Item 1</li>
	    <li id="post-2">Item 2</li>
	    <li id="post-3">Item 3</li>
	</ul>
    </body>
</html>
```

**JS**

```javascript
document.getElementById('parent-list').addEventListener('click', function(e) {
    if (e.target && e.target.nodeName == 'LI') {
        alert(`List item ${e.target.id.replace('post-', '')} was clicked!`)
    }
})
```

## Event Flow

1. Event Capturing
2. Event Target
3. Event Bubbling

### Event propagation (bubbling)

Any time one of our li elements is clicked, a **click** event is fired for that li, and then bubbles up the DOM tree, triggering each of its parent click event handlers:

 * ```<li #post-1>```
 * ```<ul #parent-list>```
 * ```<body>```
 * ```<html>```
 * *document* root

If you want to stop the event flow from event target to top element in DOM, `event.stopPropagation()` method.

### Event Capturing

The reversed flow - when the event starts from the top element and goes to the target element. Modern browsers doesn’t support event capturing by default but it can achieved by JavaScript.

 * *document* root
 * ```<html>```
 * ```<body>```
 * ```<ul #parent-list>```
 * ```<li #post-1>```

```javascript
let parent = document.getElementById('parent-list')
let child = document.getElementById('post-1')

parent.addEventListener('click', function() {
    console.log('Parent clicked')
}, true)

child.addEventListener('click', function() {
    console.log('Child clicked')
})
```

## Data attributes

 data-* attributes allow us to store extra information on standard, semantic HTML elements
 
 **HTML syntax**

```html
<article
  id="electriccars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars">
</article>
```

**JS access**

```javascript
var article = document.getElementById('electriccars')
article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```

**CSS access**

```css
article::before {
  content: attr(data-parent);
}

article[data-columns='3'] {
  width: 400px;
}

article[data-columns='4'] {
  width: 600px;
}
```

**Issues**

Do not store content that should be visible and accessible in data attributes, because assistive technology may not access them. In addition, search crawlers may not index data attributes' values. 

## `call()` vs. `apply()` vs. `bind()`

They all attach `this` into function (or object), but the difference is in the function invocation.

### `call()`

Attaches `this` into a function and executes the function immediately:

```javascript
let person = {  
    name: 'John Snow',
    hello: function(arg) {
        alert(this.name + ' says hello, ' + arg)
    }
}

// John Snow says hello, Winterfell
person.hello('Winterfell')

// Robb Stark says hello, Winterfell
person.hello.call({ name: 'Robb Stark' }, 'Winterfell')
```

### `apply()`

`apply()` is similar to `call()`, except that it takes an array-like object instead of listing the arguments out one at a time:

```javascript
let person = {
    name: 'Daenerys Targaryen',
    hello: function() {
        alert(this.name + ' says hello, ' + arguments[1])
    }
}

// Daenerys Targaryen says hello, Missandei
person.hello('Grey Worm', 'Missandei')

// Arya Stark says hello, Sandor Clegane
person.hello.apply({ name: 'Arya Stark' }, ['Brienne of Tarth', 'Sandor Clegane'])
```

### `bind()`

Attaches `this` into a function and it needs to be invoked separately:

```javascript
let person = {
    name: 'Jaime Llannister',
    hello: function(arg) {
        alert(this.name + ' says hello, ' + arg)
    }
}

// 'Jaime Llannister says hello, Casterly Rock'
person.hello('Casterly Rock')

// 'Tyrion Llannister says hello, Casterly Rock'
person.hello.bind({ name: 'Tyrion Llannister' }, 'Casterly Rock')()
```

## Callback function

A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

Here is a synchronous callback example, as it is executed immediately:

```javascript
function greeting(name) {
    alert('Hello ' + name)
}

function processUserInput(callback) {
    let name = prompt('Please, enter your name.')
    callback(name)
}

processUserInput(greeting)
```

## Promises

Async code is generally better for performance and flexibility. You can trigger numerous requests at once and then handle them when each is ready.

### Usage

```javascript
function getUrl(url) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest()
        request.open('GET', url)

        request.onload = function() {
            if (request.status == 200) {
                resolve(request.response)
            } else {
                reject(Error(request.statusText))
            }
        }

        request.onerror = function() {
            reject(Error("Network Error"))
        }

        request.send()
    })
}

getUrl('story.json').then(function (response) {
    console.log("Success!", response)
}, function(error) {
    console.error("Failed!", error)
})
```

Sometimes you don't need to complete an async tasks within the promise. If it's possible an async action will be taken. Returning a promise will be best, so you can always count on a promise, coming out of a given function. In that case you can simply call `Promise.resolve()` or `Promise.reject()` **without** using the `new` keyword.

```javascript
let userCache = {}

function getUserDetail(username) {
    // If data is cached or not, a promise will be returned!
    if (userCache[username]) {
        return Promise.resolve(userCache[username])
    }

    // Use the fetch API, which returns a promise, to get the information.
    return fetch('users/' + username + '.json')
        .then(function(result) {
            userCache[username] = result
            return result
        })
        .catch(function() {
            throw new Error('Could not find user: ' + username)
        })
}
```

Since a promise is always returned, you can always use the `then` and `catch` methods on its return value!

### `then`

All promise instances get a `then` method which allows you to react to the promise. The first `then` method callback receives the result given to it by the `resolve()` call:

```javascript
new Promise(function (resolve, reject) {
    // A mock async action using setTimeout
    setTimeout(function () {
        resolve(10)
    }, 3000)
})
.then(function(result) {
    console.log(result)
})

// 10
```

The `then` callback is triggered when the promise is resolved.  You can also chain then method callbacks:

```javascript
new Promise(function (resolve, reject) { 
	// A mock async action using setTimeout
	setTimeout(function () {
      resolve(10)
    }, 3000)
})
.then(function (num) {
    console.log('first then: ', num)
    return num * 2
})
.then(function (num) {
    console.log('second then: ', num)
    return num * 2
})
.then(function (num) {
    console.log('last then: ', num)
})

// first then: 10
// second then: 20
// last then: 40
```

Each `then` receives the result of the previous then's return value. If a promise has already resolved but `then` is called again, the callback immediately fires. If the promise is rejected and you call `then` after rejection, the callback is never called.

### `catch`

The `catch` callback is executed when the promise is rejected:

```javascript
new Promise(function (resolve, reject) {
    // A mock async action using setTimeout
    setTimeout(function () {
        reject('Done!')
    }, 3000)
})
.then(function(e) {
    console.log('done', e)
})
.catch(function(e) {
    console.log('catch: ', e)
})

// 'catch: Done!'
```

What you provide to the `reject` method is up to you. A frequent pattern is sending an `Error` to the `catch`:

```javascript
reject(Error('Data could not be found!'))
```

### `Promise.all`

There are cases when you trigger multiple `async` interactions, but only want to respond when all of them are completed. The `Promise.all` method takes an array of promises and fires one callback once they are all resolved:

```javascript
Promise.all([promise1, promise2]).then(function (results) {
    // Both promises resolved
})
.catch(function (error) {
    // One or more promises was rejected
})
```

An perfect way of thinking about `Promise.all` is firing off multiple ajax (via fetch) requests at one time:

```javascript
let request1 = fetch('/users.json');
let request2 = fetch('/articles.json');

Promise.all([request1, request2]).then(function (results) {
    // Both promises done!
})
```

Dealing with rejection is hard. If any promise is rejected, the `catch` fires for the first rejection:

```javascript
let request1 = new Promise(function (resolve, reject) { 
    // A mock async action using setTimeout
    setTimeout(function () {
        resolve('First!')
    }, 4000)
})
let request2 = new Promise(function (resolve, reject) { 
    // A mock async action using setTimeout
    setTimeout(function () {
        reject('Second!')
    }, 3000)
})

Promise.all([request1, request2]).then(function (results) {
    console.log('Then: ', results)
}).catch(function(e) {
    console.log('Catch: ', e)
})

// Catch: Second!
```

### `Promise.race`

Instead of waiting for all promises to be resolved or rejected, `Promise.race` triggers as soon as any promise in the array is resolved or rejected:

```javascript
let request1 = new Promise(function (resolve, reject) { 
    // A mock async action using setTimeout
    setTimeout(function () {
        resolve('First!')
    }, 8000)
});
let request2 = new Promise(function (resolve, reject) { 
    // A mock async action using setTimeout
    setTimeout(function () {
        resolve('Second!')
    }, 3000)
})

Promise.race([request1, request2]).then(function (one) {
    console.log('Then: ', one)
}).catch(function(one, two) {
    console.log('Catch: ', one)
})

// Then: Second!
```

A use case could be triggering a request to a primary source and a secondary source (in case the primary or secondary are unavailable).

## Classical (Functional) Inheritance

JavaScript uses functions to create objects. There is no definition for class or constructor. Functions play the role of object constructors. We can create object by calling the function with the "new" keyword.

### Creating objects

```javascript
function Animal() {}
var dog = new Animal(); // instance of Animal
var cat = new Animal(); // instance of Animal
```

Each instance is independent and has its own state and behavior. Function constructors can take parameters to give instances different state.

```javascript
function Animal(name, age) {
    this.name = name; 
    this.age = age;
}
var dog = new Animal('Rex', 5);
console.log(dog.name); // logs: Rex
var cat = new Animal('Tea', 3);
console.log(cat.age); // logs: 3
```

### Prototypes

JavaScript is prototype-oriented programming language. Every object has a prototype. Its kind of its parent object. Prototypes have properties available to all instances. The ```Object``` type is the parent of all objects, and provides common methods such as ```toString()``` and ```valueOf()```. When properties are added to the prototype, all of its instances will have these properties.

```javascript
// Adding repeat method to the String type
String.prototype.repeat = function (count) {
    var str = '';
    var pattern = String(this);
    var i;
    if (!count) { return pattern; }
    for (i = 0; i < count; i += 1) { str += pattern; }
    return str;
};

console.log('-'.repeat(5)); // logs: -----
```

### Object members

Objects can also define custom state (custom properties that only instances of this type have). Use the keyword ```this``` to attach properties to object. Property values can be either variables or functions (methods).

```javascript
function Animal(name, age) {
    this.name = name; 
    this.age = age;
    this.info = function() {
        console.log('Name: ' + this.name + '\nAge: ' + this.age);
    }
}
var dog = new Animal('Rex', 5);
dog.info();
// logs:
// Name: Rex
// Age: 5
```

Attaching methods inside the object constructor is a tricky operation. It is slow and **every** object has a function with the same functionality, yet different instance.

```javascript
function Constr(name, age) {
    this.m = function() { 
        // ...
    }
}
var x = new Constr();
var y = new Constr();
console.log (x.m === y.m); // logs: false
```

#### Solution:

Attach methods to the prototype of the constructor.

```javascript
function Animal(name, age) {
    // ...
}
Animal.prototype.info =  function() {
    // ...
}
```

#### Advantages and disadvantages of attaching methods:

**Attaching to ```this```:**

**+** Code closer to other languages - JavaScript is **not** other language and it should be treated like a first class language

**+** Hidden data

**-** Bad performance

**Attaching to ```prototype```:**

**+** Using JavaScript as it is meant

**-** No hidden data - it is not such a problem. Just prefix "hidden" data with  _ (underscore)

**+** Better performance

### Properties

Creating **getters** and **setters**

JavaScript supports properties and there are two ways to create them:

* At object declaration with ```get propName() {}``` and ```set propName(propValue) {}```
* Anytime with ```Object.defineProperty(obj, propName, descriptor)```

```javascript
Object.defineProperty(Animal.prototype, 'name', {
    get: function () {
        return this._name;
    },
    set: function (name) {
    	if (!validateName(name)) {
	    throw new Error('Name is invalid');
    	}
    	this._name = name;
    }
});
// Calling the setter
dog.name = 'Rex';
// Calling the getter
console.log(dog.name);
```

### The ```this``` object

It is a special kind of object, available everywhere in JavaScript. Yet it has a different meaning. The ```this``` object can have two different values:

* The parent scope - if none of the parents is object, its value is ```window```
* A concrete object - when the new operator is used

**```this``` in function scope:**

```javascript
function Animal(name) {
    this.name = name;
    this.getName = function getAnimalName() {
        return this.name; // Here this means the Animal object
    }
} 
var dog = new Animal('Rex');
```

**```this``` function object:**

```javascript
function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
Rect.prototype = {
    calcArea: function () {
        return this.width * this.height; // Here this means the Rect object
    },
    calcPerimeter: function () {
        return 2 * (this.width + this.height);
    }
};
var rect = new Rect(50, 55, 15, 10);
var calcRectArea = rect.calcArea();       // It is ok, because the calcArea method is attached
                                          // to the rect object. The method is called through
                                          // rect's context and then 'this' is pointing to rect.
                                          // The result is 150.
console.log(calcRectArea);
// var calcRectArea = rect.calcArea;      // We return only the function.
// console.log(calcRectArea());           // It is called in the context of 'window'.
                                          // The result is 'NaN'.
// console.log(calcRectArea.call(rect));  // The result is 150.
```

### Function Constructors

JavaScript cannot limit function to be used only as constructors. The only way to mark something as contructor is to name it PascalCase and hope that the user of the code will call PascalCase-named functions with ```new```.

```javascript
function Person(name) {
    var self = this;
    self.name = name;
    self.getName = function getPersonName() {
        return self.name;
    }
} 
var person = Person('Peter'); // Without 'new', the function is attached to the 'window'.
```

### Invoking Function Constructors Without ```new```

**Function constructor fix:**

```javascript
function Person(name, age) {
    if (!(this instanceof Person)) {
        return new Person(name, age);
    }
    this.name = name;
    this.age = age;
}
var person = Person('John', 25);
console.log(person.name); // logs: John
```

### Function Constructors with Modules (using IIFE)

Put inside a module, function constructors introduces better abstraction of the code. Another advantage is that constants and functions are hidden. JavaScript has first-class functions, so they can be easily returned by a module.

```javascript
var Person = (function () {
    function Person(name) { /* … */ }
    Person.prototype.walk = function (distance) { /*...*/ };
        return Person;
}());
```

### Hidden functions

When a function constructor is wrapped inside a module, the module can contain hidden functions and the function constructor can use these hidden functions with ```apply``` or ```call```.

```javascript
var Rect = (function () {
    function validatePosition() { /* … */ }
    function Rect(x, y, width, height) {
        var isPositionValid = validatePosition.call(this);
        if (!isPositionValid) {
            throw new Error('Invalid Rect position');
    	}
    }
    Rect.prototype = { /* … */ };
    return Rect;
}());
```

```javascript
var Car = (function () {
    var engine = {
        start: function () {
            console.log('Engine started!');
        }
    }
    function startCar() {
        engine.start();
    }
    return {
        start: startCar
    }
}());
Car.start();
```

### Inheritance with Classical OOP

 * **Implementing classical inheritance**

Inheritance is a way to extend the functionality of an object, into another object. It is achieved by setting the prototype of the derived type to the prototype of the parent.

```javascript
function Person(firstName, lastName) {}
function Student(firstName, lastName, grade) {}
Student.prototype = Person.prototype;
```

All instances of type Student are also of type Person and have Person functionality.

```javascript
(function() {
    var Shape = (function() {
        function Shape(x, y) {
            this._x = x;
            this._y = y;
        }
        Shape.prototype.move = function(to) {
            this._x = to.x || this._x;
            this._y = to.y || this._y;
        }
    	return Shape;
    }());
    var Rect = (function() {
    	function Rect(x, y, width, height) {
            Shape.call(this, x, y);
            this._width = width;
            this._height = height;
        }
        Rect.prototype = new Shape();
        Rect.prototype.calcArea = function() {
            return this._width * this._height;
        }
    	return Rect;
    }());
}());
```

 * **The prototype chain** (the way to search properties in JavaScript)

Objects in JavaScript can have only a single prototype. Their prototype also has a prototype, etc… This is called the prototype chain. When a property is called on an object: 1. This object is searched for the property, 2. If the object does not contain such property, its prototype is checked for the property, etc…, 3. If a null prototype is reached, the result is undefined.

 * **Using parent methods**

JavaScript has no direct way of calling its parent methods. Function constructors actually does not know who or what is their parent. The only way to call parent methods is by using ```call``` and ```apply```.

```javascript
var Shapes = (function() { // Defining "namespace" Shapes (module, containing smaller modules)
    var Shape = (function() {
        function Shape(x, y) {
            this._x = x;
            this._y = y;
        }
        Shape.prototype = {
            serialize: function() {
                var serializedShape = {
            	    x: this._x,
                    y: this._y
	        };
            	return serializedShape;
            }
        };
    	return Shape;
    }());
    var Rect = (function() {
    	function Rect(x, y, width, height) {
            Shape.call(this, x, y);
            this._width = width;
            this._height = height;
        }
        Rect.prototype = new Shape();
        Rect.prototype.serialize = function() {
            var serializedRect = Shape.prototype.serialize.call(this);
            serializedRect.width = this._width;
            serializedRect.height = this._height;
            return serializedRect;
        }
    	return Rect;
    }());
    return {
    	Shape: Shape,
        Rect: Rect
    };
}());
var shape = new Shapes.Shape(5, 10);
var rect = new Shapes.Rect(15, 70, 100, 50);
console.log(shape.serialize());
console.log(rect.serialize());
```

 * **OOP frameworks (John Resig simple inheritance)**

OOP is a primary design paradigm in most languages . Yet, OOP in JavaScript is not that perfect. And that's why every framework has its own way of doing OOP (YUI, Prototype.js, Backbone.js, etc...). If none of these frameworks is used, a simple implementation of John Resig is intruded.

How to use it?

Copy the code from [here](https://github.com/b-slavov/JavaScript/blob/master/libs/simple-inheritance.js)!

```javascript
(function() {
    require('libs/simple-inheritance');
    // Create "class":
    var Shape = Class.extend({
        init: function(x, y) {
            this._x = x;
            this._y = y;
        },
        serialize: function() {
            return {
                x: this._x,
                y: this._y
            };
        }
    });

    // Inherit it:
    var Rect = Shape.extend({
        init: function(x, y, width, height) {
            this._super(x, y);
            this._width = width;
            this._height = height;
        },
        serialize: function() {
            var result = this._super();
            result.width = this.width;
            result.height = this._height;
            return result;
        }
    });
});
```

## Prototypal Inheritance and Duck Typing

### Object Prototypes

The prototype is an object, that provides properties to its inheritors. Every object has its own prototype, by default, set to ```Object.prototype```. This forms the so called "Prototype chain". ```Object``` has ```null``` for prototype, ending the prototype chain.

### Setting the Prototype of an Object

Every JavaScript object has a property ```__proto__```. It can be used to access/change the prototype. When setting a prototype to an object, the object has access to all the properties of the prototype through the prototype chain. This is actually called Prototypal Inheritance.

```javascript
var animal = { // it's lower case, because it's not function constructor
    makeNoise: function () { console.log(this.type + ' says: '  + this.noise); }
};
var dog = { type: 'dog', noise: 'woof' };
dog.__proto__ = animal;
dog.makeNoise(); // makeNoise() is from the prototype(animal)
```

The ```dog``` has prototype ```animal```, which has prototype ```Object.prototype```, which has prototype ```null```.

### Setting Prototypes with Object.create()

ES5 introduces a method for setting the prototype of an object - ```Object.create(object)```

```javascript
var animal = {
    makeNoise: function () { console.log(this.type + ' says: '  + this.noise); }
};
var dog = Object.create(animal);
dog.type = 'dog';
dog.noise = 'woof';
dog.makeNoise(); // makeNoise() is from the prototype(animal)
```

### Working with Object Prototypes

Object.create() is great, but it is kind of sloppy to set properties with ```.``` The soltion is ```Object.defineProperties()```:

```javascript
var animal = {
    makeNoise: function () { console.log(this.type + ' says: '  + this.noise); }
};
var dog = Object.defineProperties(animal, {
    type: { value: 'dog' },
    noise: { value: 'woof' },
    bark: { value: function () { console.log('Bark, bark'); } }
});

dog.makeNoise();
dog.bark();
```
**Using IIFE:**

```javascript
var animal = {
	makeNoise: function () { console.log(this.type + ' says: '  + this.noise); }
};

var dog = (function () {
    var dog = Object.create(animal);
    function someHiddenFunction() { /* no outer access */ }
        Object.defineProperties(dog, {
	    type: { value: 'dog' },
	    noise: { value: 'woof' },
	    bark: { value: function () { console.log('Bark, bark'); } }
	});
    return dog;
}());

dog.makeNoise();
dog.bark();
```

### Reusing Parent Methods

It is crucial to any object-oriented design. Thankfully there are ```Function.prototype.call()``` and ```Function.prototype.apply()```

```javascript
var animal = (function () { // this is a prototype, which will be instantiated by Object.create
    var animal = {
	init: function(name, age) { // this is function constructor
	    this.name = name;
	    this.age = age;
	    return this;
	},
	get name() {
	    return this._name;
	},
	set name(value) {
	    if (value.length < 3) {
	        throw new Error('Name should be longer than 3 symbols!');
	    }
	    this._name = value;
	},
	toString: function () {
	        return this.name + ', ' + this.age;
	    }
	}
    return animal;
}());

var dog = (function (parent) {
    var dog = Object.create(parent);
    Object.defineProperty(dog, 'init', {
        value: function (name, age, guard) {
	    parent.init.call(this, name, age);
	    this.guard = guard;
	    return this;
	}
    });
    Object.defineProperty(dog, 'guard', {
        get: function () {
	    return this._guard;
	},
	set: function (value) {
	    if (!value) {
	        console.log(this.name + ' is friendly dog!');
	    }
	    this._guard = value;
	}
    });
    Object.defineProperty(dog, 'toString', {
        value: function () {
	    var baseResult = parent.toString.call(this);
	    return baseResult + ', guard: ' + this.guard;
	}
    });
    return dog;
}(animal));

var someAnimal = Object.create(animal).init('Rex', 5);
var someDog = Object.create(dog).init('Roko', 7, false);

console.log(someAnimal.toString());
console.log(someDog.toString());
```

### Duck Typing

Duck typing (something like polymorphism in other languages) is a layer of programming language and design rules on top of typing. Typing is concerned with assigning a type to any object (i.e. methods work with object of some type). Duck typing is concerned with establishing the suitability of an object for some purpose (i.e. methods with object that have certain properties).

```javascript
var arrObj = {
    length: 3,
    '0': 'One',
    '1':'Two',
    '2': 'Three'  
};
var arr = [].slice.call(arrObj);
console.log(arr); //logs: ["One", "Two", "Three"]
```
arrObj is not array, but has ```length``` property and indexes to enumerate

```javascript
var person = {
    name: 'John Snow', age: 30,
    introduce: function () {
        console.log('Hello! I am ' + this.name + ' and I am ' + this.age + '-years-old');
    }
};
person.introduce();
person.introduce.call({ name: 'Daenerys Targaryen',  age: 29 });
```

## Inheritance in ES6

```javascript
const petStore = (function () {

    class Animal {
        constructor(name, age, sound) {
            this.name = name
            this.age = age
            this.sound = sound
        }
        get name() {
            return this._name
        }
        set name(value) {
            if(typeof value !== 'string' || value.length < 2) {
                throw new Error('Name must be string value with at least 2 symbols!')
            }
            this._name = value
        }
        get age() {
            return this._age
        }
        set age(value) {
            if(value < 0) {
                throw new Error('Age cannot be negative number!')
            }
            this._age = value
        }
        get sound() {
            return this._sound
        }
        set sound(value) {
            if(typeof value !== 'string') {
                throw new Error('Sound must be string!')
            }
            this._sound = value
        }
        makeSound() {
            console.log(this.sound)
        }
        toString() {
            return `${this.name} is ${this.age} years old`
        }
    }

    class Cat extends Animal {
        constructor(name, age, color) {
            super(name, age, 'Meow')
            this.color = color
        }
        toString() {
            return `${super.toString()} ${this.color} cat`
        }
    }

    class Hydra extends Animal {
        constructor(name, age, headsCount) {
            super(name, age, 'Rawr')
            if(headsCount < 2) {
                throw new Error('Hydra must have at least 2 heads!')
            }
            this._headsCount = headsCount
        }
        get headsCount() {
            return this._headsCount
        }
        growHead() {
            this._headsCount += 1
            this.makeSound()
        }
        toString() {
            return `${super.toString()} and is a hydra with ${this.headsCount} heads!`
        }
    }

    return {
        getCat: function(name, age, color) {
            return new Cat(name, age, color)
        },
        getHydra: function(name, age, headsCount) {
            return new Hydra(name, age, headsCount)
        }
    }
}())

const tom = petStore.getCat('Tom', 2, 'gray')
const gurdun = petStore.getHydra('Gurdun', 1000, 5)

tom.makeSound()
console.log(tom.toString())

gurdun.makeSound()
console.log(gurdun.toString())
```
