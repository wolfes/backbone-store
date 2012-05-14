
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var note = require('./note');

var app = module.exports = express.createServer();


// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);

app.get('/data/notes', function(req, res) {
  console.log(note);
  console.log(note.allNotes);
  res.write(JSON.stringify(note.allNotes));
  res.end();
});


app.listen(2000, function(){
  console.log("Express server listening on port %d in %s mode", 
	      app.address().port, app.settings.env);
});
