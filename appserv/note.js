

var allNotes = exports.allNotes = function() {
    var notes = [];
    for (var i = 0; i < 300; i++) {
	notes.push({
	    'noteid': i,
	    'title': 'Title...',
	    'contents': 'contents... foo bar baz'
	});
    }
    return notes;
};