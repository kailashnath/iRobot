var errors = require('./errors');


var Ticker = function (code) {
	'use strict';
	if (!code || code.length === 0) {
		throw errors.warn("Invalid ticker: " + code);
	}
	this.codes = code.split('');
};

Ticker.prototype.executeInSeries = function (codeExecutor, onComplete) {
	'use strict';
	var codes = this.codes,
		recursive = function (index) {
			if (index === codes.length) {
				onComplete(null);
				return;
			}
			codeExecutor(codes[index], function (err) {
				if (!err) {
					recursive(index + 1);
				} else {
					onComplete(err);
					return;
				}
			});
		};

	recursive(0);
};


module.exports = Ticker;