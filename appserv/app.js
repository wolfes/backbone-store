/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var csv = require('ya-csv');

// Data for Requests.
var doc = require('./doc');
var mail = require('./mail');
var note = require('./note');

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

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
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/views/index.html');
});

app.get('/data/docs', function(req, res) {
  res.write(JSON.stringify(doc.allDocs));
  res.end();
});

app.get('/data/mail', function(req, res) {
  res.write(JSON.stringify(mail.allMail));
  res.end();
});

app.get('/data/notes', function(req, res) {
  res.write(JSON.stringify(note.allNotes));
  res.end();
});


io.sockets.on('connection', function (socket) {
    // Handle socket's connection
    socket.on('recieveData', function(data) {
	var writer = csv.createCsvFileWriter('/tmp/data');
	writer.writeRecord(data);
    });
});


app.listen(2000, function(){
  console.log("Express server listening on port %d in %s mode", 
	      app.address().port, app.settings.env);
});
