ng-click-outside
=====================

An angular directive to bind an action for a click outside the element. Uses the service for single event listener on document and destructor on each element with directive to avoid memory leaks.

###Installation

Bower

```bash
$ bower install ng-click-outside --save
```
  
NPM

```bash
$ npm install ng-click-outside --save
```

###Usage

Basic example:

```javascript
app.module('app', ['tenphi.clickOutside']);
```

webpack syntax

```javascript
app.module('app', [require('ng-click-outside')]);
```

markup

```html
<div class="dropdown" tnp-click-outside="open = false">
  <div class="dropdown-link" ng-click="open = !open"></div>
  <div class="dropdown-content" ng-show="open"></div>
</div>
```
