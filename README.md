viewport.js
==============

Library to support RWD in JavaScript. It makes setting breakpoints possible (like in CSS) and their later use in remaining JavaScript modules.


## How it works
1. You set breakpoints, preferably the same as in CSS:

    ```javascript
    var viewport = require('viewport');

    viewport.set({
        'mobile': '(max-width: 567px)',
        'tablet': '(min-width: 568px) and (max-width: 979px)',
        'desktop': '(min-width: 980px)',
        'portrait': '(orientation: portrait)',
        'landscape': '(orientation: landscape)'
    });
    ```

2. You can check the current viewport at any moment:

    ```javascript
    if (viewport.is('tablet')) {
        // do something...
    }
    ```
or get the state like as an array:
    ```javascript
    var viewport = require('viewport');
    viewport.state // ["desktop", "landscape"]
    ```

3. You can also respond to a change of viewport, binding a callback function to an event *onChange*

    ```javascript
    var viewport = require('viewport');

    viewport.onChange(function() {
        // breakpoint has changed

        if (viewport.is('mobile')) {
            // do something...
        }
    });
    ```

## Usage
*main.js*

```javascript
define(['viewport'], function(viewport) {
    viewport.set({
        'mobile': '(max-width: 567px)',
        'tablet': '(min-width: 568px) and (max-width: 979px)',
        'desktop': '(min-width: 980px)',
        'portrait': '(orientation: portrait)',
        'landscape': '(orientation: landscape)'
    });

    // ...
});
```

*mobile_menu.js*

```javascript
define(['viewport'], function(viewport) {
    'use strict';

    return function() {
        var show = function() {};
        var hide = function() {};
        var update = function() {
            if (viewport.is('mobile')) {
                show();
            } else {
                hide();
            }
        };

        viewport.onChange(update);
        update();
    };
});
```


##Compatibility
Modern browsers such as Chrome, Firefox, Opera and Safari on both desktop and smartphones.

If you want to support older browsers (IE8+), you must add a few polyfills:
 * *Array.prototype.indexOf*
 * *Array.prototype.forEach*
 * *matchMedia && matchMedia.addListener*


## Version
0.1


##License
MIT
