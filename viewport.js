define('viewport', function() {
    var breakpoints = [];
    var callbacks = [];
    var viewport = {
        'state': [],
        'is': function(alias) {
            if (!exists(alias)) {
                throw new Error('Unknown viewport alias: ' + alias);
            }

            return viewport.state.indexOf(alias) != -1;
        }
    };

    function set(newBreakpoints) {
        if (!window.matchMedia) {
            throw new Error('window.matchMedia is not available in this browser, please add a polyfill');
        }

        removeListener();
        addListener(newBreakpoints);
        update();
    };

    function removeListener() {
        breakpoints.forEach(function(breakpoint) {
            breakpoint.match.removeListener(change);
        });
        breakpoints = [];
    };

    function addListener(newBreakpoints) {
        for (var name in newBreakpoints) {
            if (newBreakpoints.hasOwnProperty(name)) {
                var breakpoint = {
                    'name': name,
                    'match': window.matchMedia(newBreakpoints[name])
                };
                breakpoints.push(breakpoint);
                breakpoint.match.addListener(change);
            }
        }
    };

    function exists(alias) {
        var state = false;

        breakpoints.forEach(function(breakpoint) {
            if (breakpoint.name === alias) {
                state = true;
            }
        });

        return state;
    };

    function change(mediaQueryList) {
        update();

        if (mediaQueryList.matches) {
            callbacks.forEach(function(callback) {
                callback(viewport);
            });
        }
    };

    function update() {
        viewport.state = [];

        breakpoints.forEach(function(breakpoint) {
            if (breakpoint.match.matches) {
                viewport.state.push(breakpoint.name);
            }
        });

        require('viewport').state = viewport.state;
    };

    function onChange(callback) {
        callbacks.push(callback);
    };

    return {
        'state': viewport.state,
        'is': viewport.is,
        'set': set,
        'onChange': onChange
    };
});
