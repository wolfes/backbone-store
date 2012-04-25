backbone-store
==============

Automatically backup selected collections &amp; models in localStorage for faster load-time fetches of the data.

A class project for MIT's 6.830 Database Systems.

A work in progress...

Methods added to Collection API:

isStored: returns true if collection has stored data
saveToStore: saves all models JSON list in localStorage.
loadFromStore: loads models from localStorage
removeFromStore: removes all of collection's models from localStorage

Coming soon:
- Storing individual models.
- Automatically storing changes to collections/models.
- Automatically loading data on page load.