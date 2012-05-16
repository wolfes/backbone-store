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
    console.log.apply(console.log, arguments);
}

util.count_ = 0;
util.times_ = {
    'local': {}
    'server': {}
};

/**
 * Add a time.
 * 'local', 'server'
 * 'doc', 'mail', 'note'
 */
util.addTime(storeType, itemType, time) {
    util.times_[storeType][itemType] = time;
    util.count_ += 1;
    if (util.count_ === 6) {
	util.sendTimes();
    }
};

util.printTimes() {
    var t = this.times_;
    sendMessage(t.local['doc'], t.local['mail'], t.local['note'],
		t.server['doc'], t.server['mail'], t.server['note'])
};