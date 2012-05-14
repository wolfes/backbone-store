/**
 * Methods for fetching data from nodejs server.
 *
 * 
 */

// Namespace for ajax methods.
var ajax = ajax || {};

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