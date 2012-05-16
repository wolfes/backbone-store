// Utility stuff used by other parts of the code
// Mike Stunes, Wolfe Styke, Frances Zhang

// Generate a Version 4 (randomly-generated) UUID
// We'll use these as keys for persisting things to the local store
// NOTE: Debatable whether Math.random is good enough here: we'll find out.
// We may consider replacing it with something better.
// Source: http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
var S = S || {};

var createGUID = function() {
    //return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    return 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

var vent = _.extend({}, Backbone.Events);

S.saveAll = function() {
    vent.trigger('saveAll', {});
};
