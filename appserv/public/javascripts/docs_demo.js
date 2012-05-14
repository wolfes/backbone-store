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
		this.model.get('authors') + ' content: ' +
		this.model.get('contents') +
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
  var local_start = Date.now();
  
  //TODO: Load docs from local storage
  S.set.Docs = new S.make.Docs();
  S.set.Docs.loadFromStore();
  
  var local_end = Date.now();
  console.log("Time it took to load from local storage: " + (local_end - local_start));

  var server_start = Date.now();
  //TODO: load docs from server
  ajax.getDocs(function(docs) {
    console.log(docs);
    // Put these notes from server into collection.
    
  });
  var server_end = Date.now();
  console.log("Time it took to load from server: " + (server_end - server_start));


/*  for (var i = 0; i < S.set.HackerMob.models.length; i++) {
    debug(JSON.stringify(S.set.HackerMob.models[i]));
  }
*/

});

