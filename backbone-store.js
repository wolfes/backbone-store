/**
 * Augment Backbone.Collection to store/load/remove
 * model data using window.localStorage.
 *
 * Author: Wolfe Styke
 * Rev: Mike Stunes
 */

// Persistence strategies
// Each is an object with a bunch of functions for handling object persistence
Backbone.persistence = Backbone.persistence || {}

/*
 * Single-object strategy. Stores the entire collection as a single JSON object
 * under a single key in localStorage.
 */
Backbone.persistence.single_key = {}

// Returns true if collection is marked for storage.
// Assumes collection.storeid is defined and not null.
Backbone.persistence.single_key.isStored = function(collection) {
    return window.localStorage.getItem(collection.storeid) !== null;
}

// Saves the collection into the local store.
// Assumes collection.storeid is defined and not null.
Backbone.persistence.single_key.saveToStore = function(collection) {
    var data = collection.map(function(model) {
        return JSON.stringify(model);
    });
    data = JSON.stringify(data);
    window.localStorage.setItem(collection.storeid, data);
    return true;
}


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
}



Backbone.Collection.prototype.persistence_strategy = Backbone.persistence.single_key;



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
