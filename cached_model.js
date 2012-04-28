// Making cached backbone.js models
// Mike Stunes, Wolfe Styke, Frances Zhang


// Callback for persisting a model into the local store
var update_fn = function(m) {
    localStorage.setItem(m.get("cache_id"), JSON.stringify(m));
};

var destroy_fn = function(m) {
    localStorage.removeItem(m.get("cache_id"));
};


// Constructor for a CachedModel object
var CachedModel = Backbone.Model.extend({
    constructor: function(cache_id) {
        console.debug("Entering CachedModel.constructor");

        // Invoke Model's own constructor first
        Backbone.Model.prototype.constructor.apply(this);

        if (cache_id) {
            this.set({cache_id: cache_id});
        } else {
            this.set({cache_id: createGUID()});
        }

        // Attach listeners for persisting and destroying
        this.on("change", function() {update_fn(this)});
        this.on("destroy", function() {destroy_fn(this)});

        // Save in cache
        update_fn(this);

        console.debug("Exiting CachedModel.constructor");
    },
});
