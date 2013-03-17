var fs = require('fs'),
	errors = require('./errors'),
	robots = require('./robots');


process.on('uncaughtException', function (err) {
	'use strict';
	console.log('%s', err);
});

var args = process.argv.splice(2);

if (args.length < 2) {
	fs.readFile('./HELP', function (err, text) {
		'use strict';
		if (!err) {
			// show the help text from the file
			throw errors.info(text);
		} else {
			throw errors.critical("Looks like the package is corrupt");
		}
	});
} else {
	var vehicle_type = args[0],
		ticker = args[1],
		vehicle = robots.allot(vehicle_type);
	vehicle.loadInstructions(ticker, function (err) {
		'use strict';
		if (err) {
			console.log(err);
		} else {
			console.log("Current position: " + this.position());
			console.log("Current facing: " + this.facing());
		}
	});
}