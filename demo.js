/**
 * Demo page for backbone-store.js functionality.
 * Author: Wolfe Styke
 */

var S = S || {};
S.make = S.make || {};
S.model = S.model || {};
S.set = S.set || {};

var debugState = true;
function debug() {
  console.log.apply(console, arguments);
}

S.make.Hacker = Backbone.Model.extend({
  defaults: {
    favLang: 'Javascript'
  },
  initialize: function(data) {
    this.set('name', data.name);
    this.set('profession', data.profession);
    this.set('school', data.school);
    this.set('favLang', data.favLang);
  }
});

var names = ['Alice', 'Bob', 'Charlie', 'Jane', 'John', 'Joe'];
var professions = ['Hacker', 'Coder', 'Programmer', 
		   'Tester', 'Program Manager', 'Project Manager']
var schools = ['MIT', 'Stanford', 'Caltech', 'CMU', 'Harvard', 'UW'];
var langs = ['Javascript', 'Python', 'R', 'Bash', 'Scheme', 'Java'];

S.make.HackerView = Backbone.View.extend({ 
  initialize: function() {

  },
  render: function() {
    var box = $("<div>" +
		this.model.get('name') + ' is a ' +
		this.model.get('profession') + ' from ' +
		this.model.get('school') + '.' +
		"</div>");
    this.setElement(box[0]);
    return this.$el;
  }
});

S.make.HackerMob = Backbone.Collection.extend({
  storeid: 'hackermob',
  model: S.make.Hacker,
  initialize: function() {
    this.on('add', this.addModel);
  },
  addModel: function(model) {
    var hackerView = new S.make.HackerView({
      model: model
    });
    ee = hackerView;
    $('#list').append(hackerView.render());
  }

});




$(document).ready(function() {
  S.hackers = [];

  // Build Hackers.
  for (var i = 0; i < 10; i++) {
    // create Hacker's, create views, cache hackers.
    var hacker = new S.make.Hacker({
      name: names[Math.floor(Math.random() * 6)],
      profession: professions[Math.floor(Math.random() * 6)],
      school: schools[Math.floor(Math.random() * 6)],
      favLang: langs[Math.floor(Math.random() * 6)]
    });
    S.hackers.push(hacker);
  }

  // Add hackers to collection
  
  S.set.HackerMob = new S.make.HackerMob();
  S.set.HackerMob.loadFromStore();

  setTimeout(function() {
    // Fake Network Lag
    S.set.HackerMob.add(S.hackers);
    S.set.HackerMob.saveToStore();
  }, 1000);


/*  for (var i = 0; i < S.set.HackerMob.models.length; i++) {
    debug(JSON.stringify(S.set.HackerMob.models[i]));
  }
*/

});


