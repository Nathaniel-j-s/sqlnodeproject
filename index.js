// Dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');

// Initializing app and dependencies.
const app = express();
app.use(express.static(__dirname + './dist'));
app.use(bodyParser.json());

// Massive setup
const connectionString = "postgres://postgres:nathan@localhost/nodesqlproject";
const massiveInstance = massive.connectSync({connectionString : connectionString})
app.set('db', massiveInstance);
const db = app.get('db');

// Massive JS functions are going to go here. Before all the app.[blah], that is.
// I bet this is terrible practice, but I was getting errors about require not being defined
// and I would have fixed it but I'm kind of in a hurry to finish this asap.
const mainCtrl = {
  list: function(req, res, next) {
    db.characters.list([],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  },
  selectCharacter: function(req, res, next) {
    db.characters.selectCharacter([req.body.charid], // Need to pass charid from button click, methinks.
    function(err, result) {
      if (err) {
        console.log(err);
      } else { // Req HTTP will look like this: http://localhost:3876/api/characters?charid=1
        res.send(result);
      }
    });
  }
};

// Massive JS function calls below. Again, bad practice, sorry! So un-modularized!
app.get('/api/characters', mainCtrl.list);
app.get('/api/characters/:charid', mainCtrl.selectCharacter);
// app.post('/api/characters', mainCtrl.newCharacter);
// app.put('/api/characters', mainCtrl.updateCharacter);

// The usual.
app.listen(3876, function() {
   console.log('Listening on port 3876.');
 });
