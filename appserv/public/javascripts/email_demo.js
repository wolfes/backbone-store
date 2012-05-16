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

vent.on('saveAll', function(data) {
    S.set.Emails.saveToStore();
});


$(document).ready(function() {
  setTimeout(function () {
  var local_start = Date.now();
  S.set.Emails = new S.make.Emails();
  S.set.Emails.loadFromStore();
  
  var local_end = Date.now();
  console.log("Time it took to load from local storage: " + (local_end - local_start));
  util.addTime('local', 'mail', local_end - local_start);
  }, 6000);


  //load emails from server

  setTimeout(function () {
  S.server_start_mail = Date.now();
  ajax.getMail(function(emails) {
    //console.log(emails);
    // Put these emails from server into collection.
    //S.set.Emails.add(emails);
    //S.set.Emails.saveToStore();
    var server_end = Date.now();
    util.addTime('server', 'mail', server_end - S.server_start_mail);
    console.log("Time it took to load from server: " + (server_end - S.server_start_mail));
    S.set.Emails.add(emails);

  });
  }, 9000);

  //var server_end = Date.now();
  //console.log("Time it took to load from server: " + (server_end - server_start));
 

/*  for (var i = 0; i < S.set.HackerMob.models.length; i++) {
    debug(JSON.stringify(S.set.HackerMob.models[i]));
  }
*/

});
