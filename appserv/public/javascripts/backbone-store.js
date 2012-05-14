/**
 * Augment Backbone.Collection to store/load/remove
 * model data using window.localStorage.
 *
 * Author: Wolfe Styke
 */

/**
 * Returns true if collection is marked for storage.
 *
 */
Backbone.Collection.prototype.isStored = function() {
  if (this.storeid === undefined || this.storeid === null) {
    return false;
  }
  return window.localStorage.getItem(this.storeid) !== null;
};

/**
 *
 *
 */
Backbone.Collection.prototype.saveToStore = function() {
  if (this.storeid === undefined || this.storeid === null) {
    return false; // This collection is not stored.
  }
  var data = this.map(function(model) {
    return JSON.stringify(model);
  });
  data = JSON.stringify(data);
  window.localStorage.setItem(this.storeid, data);
  return true;
};

/**
 *
 *
 */
Backbone.Collection.prototype.loadFromStore = function() {
  if (this.storeid === undefined || this.storeid === null) {
    return false; // This collection is not stored.
  }
  
  var data = window.localStorage.getItem(this.storeid);
  if (data === null) { // Nothing was stored for this collection.
    return false;
  }
  data = JSON.parse(data); // Returns array of JSON objects.
  for (var i = 0; i < data.length; i++) {
    this.add(JSON.parse(data[i]));
  }
  return true;
};

/**
 *
 *
 */
Backbone.Collection.prototype.removeFromStore = function() {
  if (this.storeid === undefined || this.storeid === null) {
    return false; // This collection is not stored.
  }
  return window.localStorage.removeItem(this.storeid);
};