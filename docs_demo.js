/**
 * Docs Demo page (using backbone.js for implementing local caching)
 * This demo will fetch docs from local storage INDIVIDUALLY
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

S.make.Doc = Backbone.Model.extend({
  defaults: {
  },
  initialize: function(data) {
    this.set('docid', data.docid);
    this.set('title', data.title);
    this.set('authors', data.authors);
    this.set('contents', data.contents);
  }
});


S.make.NoteView = Backbone.View.extend({ 
  initialize: function() {

  },
  render: function() {
    var box = $("<div> document " + 
		this.model.get('docid') + 'has title: ' +
		this.model.get('title') + 'and was written by: ' +
		this.model.get('authors') + ' content: '+
		this.model.get('contents')
		"</div>");
    this.setElement(box[0]);
    return this.$el;
  }
});


S.make.Docs = Backbone.Collection.extend({
  storeid: 'docs',
  model: S.make.Note,
  initialize: function() {
    this.on('add', this.addModel);
  },
  addModel: function(model) {
    var docView = new S.make.DocView({
      model: model
    });
    ee = docView;
    $('#list').append(docView.render());
  }

});




$(document).ready(function() {
  //TODO: load docs from local storage
  
  S.set.Notes = new S.make.Notes();
  S.set.Notes.loadFromStore();

  //TODO: load docs from server


/*  for (var i = 0; i < S.set.HackerMob.models.length; i++) {
    debug(JSON.stringify(S.set.HackerMob.models[i]));
  }
*/

});

