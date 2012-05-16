/**
 * Augment Backbone.Collection to store/load/remove
 * model data using window.localStorage.
 *
 * Author: Wolfe Styke
 * Rev: Mike Stunes
 */

// Persistence strategies
// Each is an object with a bunch of functions for handling object persistence
// Each persistence strategy defines these methods:
//   isStored(collection)
//   saveToStore(collection)
//   loadFromStore(collection)
//   removeFromStore(collection)
//   onAdd(collection)
//   onRemove(collection)
//   onChange(model)
Backbone.persistence = Backbone.persistence || {};

/*
 * Single-object strategy. Stores the entire collection as a single JSON object
 * under a single key in localStorage.
 */
Backbone.persistence.single_key = {};

// Returns true if collection is marked for storage.
// Assumes collection.storeid is defined and not null.
Backbone.persistence.single_key.isStored = function(collection) {
    return window.localStorage.getItem(collection.storeid) !== null;
};

// Saves the collection into the local store.
// Assumes collection.storeid is defined and not null.
Backbone.persistence.single_key.saveToStore = function(collection) {
    var data = collection.map(function(model) {
        return JSON.stringify(model);
    });
    data = JSON.stringify(data);
    window.localStorage.setItem(collection.storeid, data);
    return true;
};


// Populates the collection with models from the store.
// Assumes collection.storeid is defined and not null.
Backbone.persistence.single_key.loadFromStore = function(collection) {
    var data = window.localStorage.getItem(collection.storeid);
    if (data === null) {
        return false;
    }
    data = JSON.parse(data);
    for (var i = 0; i < data.length; i++) {
        collection.add(JSON.parse(data[i]));
    }
    return true;
};


// Removes the collection from the store.
// Assumes collection.storeid is defined and not null.
Backbone.persistence.single_key.removeFromStore = function(collection) {
    return window.localStorage.removeItem(collection.storeid);
};


// Called when a model is added to the collection.
// Doesn't matter here; changes in the size of the collection don't affect
// persistence.
Backbone.persistence.single_key.onAdd = function(collection) {
};


// Called when a model is removed from the collection.
// Doesn't matter here; changes in the size of the collection don't affect
// persistence.
Backbone.persistence.single_key.onRemove = function(collection) {
};


// Called when a model is changed.
// Again, no-op here.
Backbone.persistence.single_key.onChange = function(model) {
};



/*
 * One-per-object strategy. Stores each model as a separate JSON object in
 * localStorage.
 *
 * One key, with the name in collection.storeid, stores the number of models
 * in the collection. Each model is stored under a key with the name in
 * collection.storeid, a '#', and the stringified index of the model in the
 * collection.
 */
Backbone.persistence.each_model = {};

// Returns true if collection is marked for storage.
// Assumes collection.storeid is defined and not null.
Backbone.persistence.each_model.isStored = function(collection) {
    return window.localStorage.getItem(collection.storeid) !== null;
};


// Saves the collection into the local store.
// Assumes collection.storeid is defined and not null.
Backbone.persistence.each_model.saveToStore = function(collection) {
    // Save old # of models in localStorage (in case old models need to be
    // removed)
    var oldCount = window.localStorage.getItem(collection.storeid);

    if (oldCount === undefined || oldCount === null || isNaN(oldCount)) {
        oldCount = 0;
    }

    // Store new count
    window.localStorage.setItem(collection.storeid, collection.length);

    // Has collection changed?
    var hasChanged = collection.hasChanged;
    if (hasChanged === undefined || hasChanged === null) {
        hasChanged = false;
    }
    if (oldCount === 0 && collection.length > 0) {
        hasChanged = true;
    }


    if (hasChanged) {
        // Collection's size has changed; need to re-persist the whole
        // thing.
        for (var i = 0; i < collection.length; i++) {
            var thisKey = String(collection.storeid) + '#' + String(i);
            window.localStorage.setItem(thisKey, JSON.stringify(collection.at(i)));
        }

        // Remove old models
        if (oldCount > collection.length) {
            for (var i = oldCount; i < collection.length; i++) {
                var key = String(collection.storeid) + '#' + String(i);
                window.localStorage.removeItem(key);
            }
        }

        return true;
    } else {
        // Collection's size hasn't changed; only persist modified models
        for (var i = 0; i < collection.length; i++) {
            var model = collection.at(i);
            var modelChanged = model.hasBeenChanged;
            
            if (modelChanged === undefined || modelChanged === null) {
                modelChanged = true;
            }

            if (modelChanged) {
                var thisKey = String(collection.storeid) + '#' + String(i);
                window.localStorage.setItem(thisKey, JSON.stringify(model));
                model.hasBeenChanged = false;
            }
        }

        return true;
    }
        
};


// Populates the collection with models from the store.
// Assumes collection.storeid is defined and not null.
Backbone.persistence.each_model.loadFromStore = function(collection) {
    // Get count of models (collection length)
    var count = window.localStorage.getItem(collection.storeid);

    if (count === undefined || count === null) {
        return false;
    }

    var result = true;
    for (var i = 0; i < count; i++) {
        // Grab this model out of the store
        var thisKey = String(collection.storeid) + '#' + String(i);
        var data = window.localStorage.getItem(thisKey);
        if (data === null) {
            result = false;
            continue;
        }
        collection.add(JSON.parse(data));
    }

    return result;
}


// Removes the collection from the store.
// Assumes collection.storeid is defined and not null.
Backbone.persistence.each_model.removeFromStore = function(collection) {
    // Get count of models (collection length)
    var count = window.localStorage.getItem(collection.storeid);

    if (count === undefined || count === null) {
        return false;
    }

    // Remove each model from the store
    for (var i = 0; i < count; i++) {
        var thisKey = String(collection.storeid) + '#' + String(i);
        window.localStorage.removeItem(thisKey);
    }

    // Finally, remove collection length
    window.localStorage.removeItem(collection.storeid);
    return true;
}


Backbone.persistence.each_model.onAdd = function(collection) {
    collection.hasChanged = true;
};


Backbone.persistence.each_model.onRemove = function(collection) {
    collection.hasChanged = true;
};


Backbone.persistence.each_model.onChange = function(model) {
    model.hasBeenChanged = true;
}



/*
 * Set a default persistence model for new collections
 */
//Backbone.Collection.prototype.persistence_strategy = Backbone.persistence.single_key;
Backbone.Collection.prototype.persistence_strategy = Backbone.persistence.each_model;



/**
 * Returns true if collection is marked for storage.
 *
 */
Backbone.Collection.prototype.isStored = function() {
  if (this.storeid === undefined || this.storeid === null) {
    return false;
  }
  return this.persistence_strategy.isStored(this);
};

/**
 *
 *
 */
Backbone.Collection.prototype.saveToStore = function() {
  if (this.storeid === undefined || this.storeid === null) {
    return false; // This collection is not stored.
  }
  return this.persistence_strategy.saveToStore(this);
};

/**
 *
 *
 */
Backbone.Collection.prototype.loadFromStore = function() {
  if (this.storeid === undefined || this.storeid === null) {
    return false; // This collection is not stored.
  }
  return this.persistence_strategy.loadFromStore(this);
};

/**
 *
 *
 */
Backbone.Collection.prototype.removeFromStore = function() {
  if (this.storeid === undefined || this.storeid === null) {
    return false; // This collection is not stored.
  }
  return this.persistence_strategy.removeFromStore(this);
};

Backbone.Collection.prototype.on('add', function() {
    this.persistence_strategy.onAdd(this);
});

Backbone.Collection.prototype.on('remove', function() {
    this.persistence_strategy.onRemove(this);
});

Backbone.Collection.prototype.on('change', function() {
    this.persistence_strategy.onChange(arguments[0]);
});
