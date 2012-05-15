/**
 * Module dependencies.
 */
var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var json2csv = require('json2csv');

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

app.get('/emails.html', function(req, res) {
  res.sendfile(__dirname + '/views/emails.html');
});

app.get('/emails_local.html', function(req, res) {
  res.sendfile(__dirname + '/views/emails_local.html');
});
app.get('/email.html', function(req, res) {
    res.sendfile(__dirname + '/views/email.html');
});
app.get('/emails_remote.html', function(req, res) {
  res.sendfile(__dirname + '/views/emails_remote.html');
});


app.get('/docs', function(req, res) {
  res.sendfile(__dirname + '/views/docs.html');
});
app.get('/notes', function(req, res) {
  res.sendfile(__dirname + '/views/notes.html');
});

app.get('/data/docs', function(req, res) {
    res.write(JSON.stringify(doc.allDocs()));
  res.end();
});

app.get('/data/mail', function(req, res) {
    res.write(JSON.stringify(mail.allMail()));
  res.end();
});

app.get('/data/notes', function(req, res) {
    res.write(JSON.stringify(note.allNotes()));
  res.end();
});

var allData = [];

io.sockets.on('connection', function (socket) {

    // Handle socket's connection
    socket.on('timeData', function(data) {
	var numReq = 15;
	if (!(data.name in allData)) {
	    allData[data.name] = [];
	}
	if (allData[data.name].length === numReq) {
	    return; // Done, must refresh server for this name.
	}
	if (!(data.name in allData)) {
	    allData[data.name] = [];
	}
	allData[data.name].push(data.data);
	if (allData[data.name].length < numReq) {
	    socket.emit('nextTime', {'numItems': allData[data.name].length});
	    return;
	}

	var csv = json2csv.parse({
	    data: allData[data.name],
	    fields: ['sdoc', 'smail', 'snote', 
		     'cdoc', 'cmail', 'cnote']
	});

	fs.writeFile('data_' + data.name + '.csv', csv, function(err) {
	    if (err) throw err;
	    console.log('file saved!');
	});

	socket.emit('doneTime');
    });
});


app.listen(2000, function(){
  console.log("Express server listening on port %d in %s mode", 
	      app.address().port, app.settings.env);
});
