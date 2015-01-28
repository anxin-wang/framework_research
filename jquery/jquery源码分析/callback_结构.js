// String to Object options format cache
var optionsCache = {};
function createOptions( options ) {
    var object = optionsCache[ options ] = {};
    jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
        object[ flag ] = true;
    });
    return object;
}

jQuery.Callbacks = function( options ) {
    //一堆变量的定义
    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    //先处理参数，将string转成json
    //‘once memory'转成option:{once:true,memory:true}
    options = typeof options === "string" ?
        ( optionsCache[ options ] || createOptions( options ) ) :
        jQuery.extend( {}, options );
    var // Last fire value (for non-forgettable lists)
        memory,
    // Flag to know if list was already fired
        fired,
    // Flag to know if list is currently firing
        firing,
    // First callback to fire (used internally by add and fireWith)
        firingStart,
    // End of the loop when firing
        firingLength,
    // Index of currently firing callback (modified by remove if needed)
        firingIndex,
    // Actual callback list
        list = [],
    // Stack of fire calls for repeatable lists
        stack = !options.once && [],
    // Fire callbacks
        fire = function( data ) {},
    // Actual Callbacks object
        self = {
            add: function() {},
            // Remove a callback from the list
            remove: function() {},
            has: function( fn ) {},
            empty: function() {},
            disable: function() {},
            disabled: function() {},
            // Lock the list in its current state
            lock: function() {},
            // Is it locked?
            locked: function() {},
            // Call all callbacks with the given context and arguments
            fireWith: function( context, args ) {},
            // Call all the callbacks with the given arguments
            fire: function() {},
            // To know if the callbacks have already been called at least once
            fired: function() {}
        };
    return self;
}
