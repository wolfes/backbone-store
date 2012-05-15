// Making cached backbone.js models
// Mike Stunes, Wolfe Styke, Frances Zhang


// Callback for persisting a model into the local store
var update_fn = function(m) {
    localStorage.setItem(m.get("cache_id"), JSON.stringify(m));
};

// Callback for removing a model from the local store
var destroy_fn = function(m) {
    localStorage.removeItem(m.get("cache_id"));
};


// Constructor for a CachedModel object
var CachedModel = Backbone.Model.extend({
    constructor: function(attributes, options) {
        console.debug("Entering CachedModel.constructor");

        // Invoke Model's own constructor first
        Backbone.Model.prototype.constructor.call(this, attributes, options);

        // Check if cache_id was given to us: if not, generate one
        if (!this.get("cache_id")) {
            this.set({cache_id: createGUID()});
        }

        // Attach listeners for persisting and destroying
        this._set_listeners();

        // Save in cache
        update_fn(this);

        console.debug("Exiting CachedModel.constructor");
        return this;
    },


    reload_hook: function() {},

    _set_listeners: function() {
        this.on("change", function() {update_fn(this)});
        this.on("destroy", function() {destroy_fn(this)});
    },
});

_.extend(CachedModel, {
    from_cache: function(cache_id) {
        // Check that we were given a cache_id, and that it's actually in the cache
        // TODO: if ID not in cache, just make a new object?
        if (!cache_id) return;
        if (!localStorage.hasOwnProperty(cache_id)) return;

        // Fetch old data from the cache before obliterating it by creating a new model
        var old_attributes = JSON.parse(localStorage[cache_id]);


        // Create a new model, using the usual initialize and constructor of
        // whichever type the programmer wants
        // It's on the programmer to call from_cache of the right constructor
        // function
        var new_model = new this({cache_id: cache_id});

        // Then, reload all of the old attributes
        new_model.set(old_attributes);

        new_model.reload_hook();
        // new_model should already have listeners set (by "new")
        
        return new_model;
    },
});


// Extension of CachedModel, for testing that the correct attributes all stick
// around after reloading from cache
var MyAwesomeModel = CachedModel.extend({
    defaults: {"my_class" : "MyAwesomeModel", c:"e", f:"g"},

    initialize: function() {
        console.debug("MyAwesomeModel.initialize");
    },

    validate: function(attrs) {
        console.debug("MyAwesomeModel.validate");
    },
});
