/**
 * Methods for fetching data from nodejs server.
 *
 * 
 */

// Namespace for ajax methods.
var ajax = ajax || {};
var util = util || {};

ajax.baseURL = window.location.href;

ajax.getDocs = function(continuation) {
  ajax.getJSON('data/docs', continuation);
}

ajax.getMail = function(continuation) {
  ajax.getJSON('data/mail', continuation);  
}

ajax.getNotes = function(continuation) {
  ajax.getJSON('data/notes', continuation);
}

ajax.get = function(url, continuation) {
  $.ajax({
    url: ajax.baseURL + url
  }).done(function ( data ) {
    continuation(data);
  });
};

ajax.getJSON = function(url, continuation) {
  $.ajax({
    url: ajax.baseURL + url
  }).done(function ( data ) {
    continuation(JSON.parse(data));
  });
};


/**
 * Utility Methods
 *
 */

function debug() {
    console.log.apply(console, arguments);
}

util.count_ = 0;
util.times_ = {};

/**
 * Add a time.
 * 'local', 'server'
 * 'doc', 'mail', 'note'
 */
util.addTime = function(storeType, itemType, time) {
    if (!(S.dataName in util.times_)) {
	util.times_[S.dataName] = {server:{}, local: {}};
    }
    util.times_[S.dataName][storeType][itemType] = time;
    util.count_ += 1;
    if (util.count_ === 6) {
	util.sendTimes(S.dataName);
    }
};

util.sendTimes = function(dataName) {
    var t = util.times_[dataName];
    debug(t);
    socket.emit('timeData', {
	'name': S.dataName,
	'data': {
	    'sdoc': t.server.doc,
	    'smail': t.server.mail,
	    'snote': t.server.note,
	    'cdoc': t.local.doc,
	    'cmail': t.local.mail,
	    'cnote': t.local.note,
	}
    });		
};
