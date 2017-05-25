module.exports = {
  list: function(req, res, next) {
    db.characters.list([],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  },
  // selectCharacter: function(req, res, next) {
  //   db.characters
  // }

}
