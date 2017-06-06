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
  listChars: function(req, res, next) {
    db.characters.listChars([],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }, // Figure out GROUP BY, then use it.
  listGames: function(req, res, next) {
    db.characters.listGames([],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  },
  listCharsByGame: function(req, res, next) {
    db.characters.listCharsByGame([req.query.game],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  },
  sortGamesByFun: function(req, res, next) {
    db.characters.sortGamesByFun([],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  },
  selectCharacter: function(req, res, next) {
    db.characters.selectCharacter([req.query.charid], // Need to pass charid from button click, methinks.
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  },
  newCharacter: function(req, res, next) {
    db.characters.newCharacter([req.body.name, req.body.games, req.body.classes],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  },
  newGame: function(req, res, next) {
    db.characters.newGame([req.body.gname, req.body.style, req.body.fun],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  },
  updateCharacter: function(req, res, next) {
    db.characters.updateCharacter([req.query.charid, req.body.name, req.body.games, req.body.classes],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  },
  deleteCharacter: function(req, res, next) {
    db.characters.deleteCharacter([req.query.charid],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  }
};

// Massive JS function calls below. Again, bad practice, sorry! So un-modularized!
app.get('/api/characters', mainCtrl.listChars);
app.get('/api/games', mainCtrl.listGames);
app.get('/api/characters/:games', mainCtrl.listCharsByGame);
app.get('/api/games/fun', mainCtrl.sortGamesByFun); // <-- Fix these things. No verbs.
app.get('/api/character/:charid', mainCtrl.selectCharacter);
app.post('/api/newcharacter', mainCtrl.newCharacter);
app.post('/api/newgame', mainCtrl.newGame);
app.put('/api/characters', mainCtrl.updateCharacter); // URL looks like http://localhost:3876/api/characters?charid=1. Figure out why /:charid is breaking this line.
app.delete('/api/characters/:charid', mainCtrl.deleteCharacter);

// The usual.
app.listen(3876, function() {
   console.log('Listening on port 3876.');
 });
