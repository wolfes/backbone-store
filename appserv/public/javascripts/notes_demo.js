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
    this.set('contents', data.contents);
  }
});


S.make.NoteView = Backbone.View.extend({ 
  initialize: function() {

  },
  render: function() {
    var box = $(
    	"<div>" +
    	"<b>Note id</b>: " + this.model.get('noteid') + "</br>" +
    	"<b>Title</b>: " + this.model.get('title') + "</br>" +
    	"<b>Content</b>:</br>" + this.model.get('contents') +
		"</br></br>" +
	    "</div>");
    this.setElement(box[0]);
    return this.$el;
  }
});


S.make.Notes = Backbone.Collection.extend({
  storeid: 'notes',
  model: S.make.Note,
  initialize: function() {
    if ((typeof S.showNotes === 'boolean') && S.showNotes) {
      this.on('add', this.addModel);
    }
  },
  addModel: function(model) {
    var noteView = new S.make.NoteView({
      model: model
    });
    ee = noteView;
    $('#list').append(noteView.render());
  }

});

vent.on('saveAll', function(data) {
    S.set.Notes.saveToStore();
});

S.loadLocalNotes = function() {
  var local_start = Date.now();
  S.set.Notes.loadFromStore();
  var local_end = Date.now();
  util.addTime('local', 'note', local_end - local_start);
  console.log("Time it took to load from local storage: " + (local_end - local_start));
};

S.loadRemoteNotes = function () {
  S.server_start_note = Date.now();
  //load notes from server
  ajax.getNotes(function(notes) {
    //console.log(notes);
    // Put these notes from server into collection.
    //S.set.Notes.saveToStore();

    S.set.Notes.add(notes);

    var server_end = Date.now();
    console.log("Time it took to load from server: " + (server_end - S.server_start_note));
    util.addTime('server', 'note', server_end - S.server_start_note);
  });
};

$(document).ready(function() {
  S.set.Notes = new S.make.Notes();
    if ((typeof S.showNotes === 'boolean') && S.showNotes) {
	if (typeof S.local === 'boolean') {
	    if (S.local) {
		S.loadLocalNotes();
	    } else {
		S.loadRemoteNotes();
	    }
	} else {
	    S.loadLocalNotes();
	    S.loadRemoteNotes();
	}
    } else {
	setTimeout(S.loadLocalNotes, 2000);
	setTimeout(S.loadRemoteNotes, 2500);
    }
});


