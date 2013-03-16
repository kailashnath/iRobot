var fs = require('fs'),
	errors = require('./errors');


process.on('uncaughtException', function (err) {
	console.log('%s', err);
});

var arguments = process.argv.splice(2);

if (arguments.length < 2) {
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

}