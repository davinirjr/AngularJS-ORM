AngularJS-ORM
=============

## An example of scalable architecture

This is an **example code project** for my AngularJS-ORM talk at NGConf 2014.

Slides: [Slid.es/ProLoser/AngularJS-ORM](http://slid.es/proloser/angularjs-orm)  
Original Code (Coffeescript + Sockets): [coffee-sockets](https://github.com/ProLoser/AngularJS-ORM/tree/coffee-sockets)  
[![NG-Conf 2014 Talk](http://i1.ytimg.com/vi/Iw-3qgG_ipU/0.jpg)](http://www.youtube.com/watch?v=Iw-3qgG_ipU)


[If you have questions, open an issue](https://github.com/ProLoser/AngularJS-ORM/issues)
--------------------------------------

Notes
-----

#### **I don't use a src, css, view, controller, etc folders**  
In today's code, it's sensible keep modules together and small. HTML, JS and CSS are closely tied together, so we should organize projects that way.

#### **If you can't open-source your directives, they probably shouldn't exist**  
A lot of people will create what I refer to as 'one-off' directives. They should usually just be sub-states.

#### **Don't do state management inside services/factories**  
Even though you have an Auth service, or something else, you should always have them bubble their results up to the top of the promise chain. Alway do URL / state jumping from controllers or state definitions, otherwise people have to go diving through a deeply nested chain of service callbacks to figure out why they keep getting an infinite redirect loop. Your services should be implementation agnostic.

#### **[Keep controllers implementation agnostic](https://github.com/ProLoser/AngularJS-ORM/blob/62ce345d6b6152a332562d58b0ec73d194ca3d8c/modules/Authentication/Login.js#L28-L37)**  
Your controllers should be implementation agnostic. Occasionally people use the `ui-boostrap/modal` service which lets you specify a controller and template and resolves. Inside that controller, you have access to `$modalInstance`, which is actually very bad practice. This means if your boss decides one day to no longer use a modal, you have to refactor the controller too (albeit trivially). Instead, have the `$modalInstance` resolve in a state definition, and use the `onEnter()` and `onExit()` callbacks to clean up implementation-specific logic. This leaves the controller free to just focus on it's internal view-related matters. [Example](https://github.com/ProLoser/AngularJS-ORM/blob/62ce345d6b6152a332562d58b0ec73d194ca3d8c/modules/Authentication/Login.js#L28-L37)

ES6 Syntax
------------

I use ES6 because it gives me easy-to-code classes and because the last line is always returned in arrow functions (which is great for promise chaining). You do not have to use ES6, and should not refactor into it 'just because'.

### How To Read

**Javascript:**
```js
function( x, y, z ){
  return z
}

function x(z) {
  // constructor
  this.y = z;
}
x.prototype.method = function(){}
```
**ES6**
```js
( x, y, z ) => {
  this.whatever // `this` is bound to OUTER scope
  z // last line of functions are always returned
}

class x {
  constructor(z) {
    this.y = z;
  }
  method(z) {}
}
```
