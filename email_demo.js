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
    var box = $("<div> email "+
		this.model.get('eid') + ' was sent to ' +
		this.model.get('to') + ' from ' +
		this.model.get('from') +  ' with subject '+
		this.model.get('subject') + ' and content: '+
		this.model.get('content') +
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

  //TODO: Load emails from local storage
  
  S.set.Emails = new S.make.Emails();
  S.set.Emails.loadFromStore();

  //TODO: load emails from server
  
/*  for (var i = 0; i < S.set.HackerMob.models.length; i++) {
    debug(JSON.stringify(S.set.HackerMob.models[i]));
  }
*/

});
