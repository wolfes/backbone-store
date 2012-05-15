/**
 * Email Demo (using backbone.js for implementing local caching)
 * This demo will fetch emails from local storage one CLUMP at a time
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

S.make.Email = Backbone.Model.extend({
  defaults: {
  },
  initialize: function(data) {
    this.set('eid', data.eid);
    this.set('to', data.to);
    this.set('from', data.from);
    this.set('subject', data.subject);
    this.set('body', data.body);
  }
});

S.make.EmailView = Backbone.View.extend({ 
  initialize: function() {

  },
  render: function() {
  	var box = $("<div>" +
    	"<b>Email id</b>: " + this.model.get('eid') + "</br>" +
    	"<b>Recipient</b>: " + this.model.get('to') + "</br>" +
    	"<b>Sender</b>: " + this.model.get('from') + "</br>"+
    	"<b>Subject</b>: " + this.model.get('subject') + "</br>" +
    	"<b>Content</b>:</br>" + this.model.get('body') +
		"</br></br>" +
	"</div>");
    this.setElement(box[0]);
    return this.$el;
  }
});


S.make.Emails = Backbone.Collection.extend({
  storeid: 'emails',
  model: S.make.Email,
  initialize: function() {
    this.on('add', this.addModel);
  },
  addModel: function(model) {
    var emailView = new S.make.EmailView({
      model: model
    });
    ee = emailView;
    $('#list').append(emailView.render());
  }

});


$(document).ready(function() {
  var local_start = Date.now();
  
  //TODO: Load emails from local storage
  S.set.Emails = new S.make.Emails();
  //S.set.Emails.loadFromStore();
  
  var local_end = Date.now();
  console.log("Time it took to load from local storage: " + (local_end - local_start));

  var server_start = Date.now();
  //load emails from server
  ajax.getMail(function(emails) {
    //console.log(emails);
    // Put these emails from server into collection.
    S.set.Emails.add(emails);
    //S.set.Emails.saveToStore();
  });
  var server_end = Date.now();
  console.log("Time it took to load from server: " + (server_end - server_start));
 

/*  for (var i = 0; i < S.set.HackerMob.models.length; i++) {
    debug(JSON.stringify(S.set.HackerMob.models[i]));
  }
*/

});
