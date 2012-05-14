/**
 * Notes Demo page (using backbone.js for implementing local caching)
 * This demo will fetch all the notes from local storage as a COLLECTION
 * Author: Frances Zhang
 */

var S = S || {};
S.make = S.make || {};
S.model = S.model || {};
S.set = S.set || {};

var debugState = true;
function debug() {
  console.log.apply(console, arguments);
}

S.make.Note = Backbone.Model.extend({
  defaults: {
    //favLang: 'Javascript'
  },
  initialize: function(data) {
    this.set('noteid', data.noteid);
    this.set('title', data.title);
    this.set('content', data.content);
  }
});


S.make.NoteView = Backbone.View.extend({ 
  initialize: function() {

  },
  render: function() {
    var box = $("<div> note " + 
		this.model.get('noteid') + 'has title: ' +
		this.model.get('title') + 'has content: ' +
		this.model.get('content') + '.' +
		"</div>");
    this.setElement(box[0]);
    return this.$el;
  }
});


S.make.Notes = Backbone.Collection.extend({
  storeid: 'notes',
  model: S.make.Note,
  initialize: function() {
    this.on('add', this.addModel);
  },
  addModel: function(model) {
    var noteView = new S.make.NoteView({
      model: model
    });
    ee = noteView;
    $('#list').append(noteView.render());
  }

});


$(document).ready(function() {
  //TODO: load notes from local storage
  
  S.set.Notes = new S.make.Notes();
  S.set.Notes.loadFromStore();
  
  //TODO: load notes from server

/*  for (var i = 0; i < S.set.HackerMob.models.length; i++) {
    debug(JSON.stringify(S.set.HackerMob.models[i]));
  }
*/

});


