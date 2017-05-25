var app = require('../index.js');
var db = app.get('db');

module.exports = {
	run: function() {
		console.log('Starting database.');

		db.init.make_tables(function(err, table) {
			if (err) {
        return console.log('Something went wrong.', err);
      } else {
        console.log('Service working successfully.');
      }
		});
	}
};
