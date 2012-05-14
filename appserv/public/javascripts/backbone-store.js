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
//   onAdd(model, collection)
//   onRemove(model, collection)
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
Backbone.persistence.single_key.onAdd = function(model, collection) {
};


// Called when a model is removed from the collection.
// Doesn't matter here; changes in the size of the collection don't affect
// persistence.
Backbone.persistence.single_key.onRemove = function(model, collection) {
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
    var models = [];

    for (var i = 0; i < collection.length; i++) {
        var model = collection.at(i);
        if (model.cacheid === undefined || model.cacheid === null) {
            model.cacheid = createGUID();
        }

        if (model.hasBeenChanged === undefined || model.hasBeenChanged === null || model.hasBeenChanged) {
            // This model is dirty; save it
            window.localStorage.setItem(model.cacheid, JSON.stringify(model));
            model.hasBeenChanged = false;
        }

        models.push(model.cacheid);
    }

    // Write the list of models
    window.localStorage.setItem(collection.storeid, JSON.stringify(models));
}


// Populates the collection with models from the store.
// Assumes collection.storeid is defined and not null.
Backbone.persistence.each_model.loadFromStore = function(collection) {
    // Get list of model IDs in this collection
    var models = window.localStorage.getItem(collection.storeid);
    if (models === undefined || models === null) {
        return false;
    }
    models = JSON.parse(models);

    for (var i = 0; i < models.length; i++) {
        var data = window.localStorage.getItem(models[i]);
        data = JSON.parse(data);
        var model = new collection.model(data);
        model.cacheid = models[i];
        collection.add(model);
    }
}


// Removes the collection from the store.
// Assumes collection.storeid is defined and not null.
Backbone.persistence.each_model.removeFromStore = function(collection) {
    return window.localStorage.removeIte(collection.storeid);
}


Backbone.persistence.each_model.onAdd = function(model, collection) {
    var cacheid = model.cacheid;
    if (cacheid === undefined || cacheid === null) {
        cacheid = createGUID();
        model.cacheid = cacheid;
    }
    model.hasBeenChanged = true;
};


Backbone.persistence.each_model.onRemove = function(collection) {
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

Backbone.Collection.prototype.on('add', function(model, collection, options) {
    this.persistence_strategy.onAdd(model, collection);
});

Backbone.Collection.prototype.on('remove', function(model, collection, options) {
    this.persistence_strategy.onRemove(model, collection);
});

Backbone.Collection.prototype.on('change', function() {
    this.persistence_strategy.onChange(arguments[0]);
});
