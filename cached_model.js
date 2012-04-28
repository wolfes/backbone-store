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
    defaults: {"my_class" : "CachedModel"},

    constructor: function(cache_id) {
        console.debug("Entering CachedModel.constructor");

        // Invoke Model's own constructor first
        Backbone.Model.prototype.constructor.apply(this);

        // Check for provided cache_id and generate one if not given one
        if (!cache_id) {
            this.set({cache_id: createGUID()});
        } else {
            // If given an ID, see if it's already present in local storage
            if (localStorage.hasOwnProperty(cache_id)) {
                // If so, load all of its old attributes
                var old_object = JSON.parse(localStorage[cache_id]);
                this.set(old_object);
            } else {
                // If not already present, make a new model object
                this.set({cache_id: cache_id});
            }
        }

        // Attach listeners for persisting and destroying
        this.on("change", function() {update_fn(this)});
        this.on("destroy", function() {destroy_fn(this)});

        // Save in cache
        update_fn(this);

        console.debug("Exiting CachedModel.constructor");
    },
});


var MyAwesomeModel = CachedModel.extend({
    defaults: {"my_class" : "MyAwesomeModel"},

    initialize: function() {
        console.debug("MyAwesomeModel.initialize");
    },
});


// TODO: also allow passing attributes in constructor?
// TODO: what if subclass's initialize clobbers cached attrs?
//   avoid running initialize when loading from cache?
