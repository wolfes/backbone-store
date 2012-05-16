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


S.make.DocView = Backbone.View.extend({ 
  initialize: function() {

  },
  render: function() {
    var box = $(
    "<div>" +
    	"<b>Document id</b>: " + this.model.get('docid') + "</br>" +
    	"<b>Title</b>: " + this.model.get('title') + "</br>" +
    	"<b>Author(s)</b>: " + this.model.get('authors') + "</br>"+
    	"<b>Content</b>:</br>" + this.model.get('contents') +
		"</br></br>" +
	"</div>");
    this.setElement(box[0]);
    return this.$el;
  }
});


S.make.Docs = Backbone.Collection.extend({
  storeid: 'docs',
  model: S.make.Doc,
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

  S.server_start = Date.now();
  //load docs from server
  ajax.getDocs(function(docs) {
    //console.log(docs);
    // Put these docs from server into collection.
    S.set.Docs.add(docs);
    //S.set.Docs.saveToStore();
    var server_end = Date.now();
    console.log("Time it took to load from server: " + (server_end - S.server_start));
  });
  //var server_end = Date.now();
  //console.log("Time it took to load from server: " + (server_end - server_start));
  //S.set.Docs.saveToStore();


/*  for (var i = 0; i < S.set.HackerMob.models.length; i++) {
    debug(JSON.stringify(S.set.HackerMob.models[i]));
  }
*/

});

