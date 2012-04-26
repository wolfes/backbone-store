// Making cached backbone.js models
// Mike Stunes, Wolfe Styke, Frances Zhang


// Callback for persisting a model into the local store
var update_fn = function(m) {
    localStorage.setItem(m.get("cache_id"), JSON.stringify(m));
};

var destroy_fn = function(m) {
    // TODO: destroy model here
};


// Constructor for a CachedModel object
// TODO: take an ID instead of generating it
// TODO: make sure our initialize always gets called, even if overridden by
// the user's code
//   Backbone has some sort of preinitialization: take a look
var CachedModel = Backbone.Model.extend({
    initialize: function() {
        // Set a cache ID for this new object
        this.set({cache_id: createGUID()});

        // Attach the listener for persisting on modify
        this.on("change", function() {update_fn(this)});
        this.on("destroy", function() {destroy_fn(this)});
    },
});
