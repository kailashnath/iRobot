var util = require('util');


var BaseError = function (level, message, constructor) {
	'use strict';

	Error.captureStackTrace(this, constructor || this);
	this.message = util.format('%s: %s', level, message);
};
util.inherits(BaseError, Error);


var info = function (message) {
	'use strict';

	return new BaseError('Minor', message);
};

var warn = function (message) {
	'use strict';
	return new BaseError('Major', message);
};

var critical = function (message) {
	'use strict';
	return new BaseError('Critical', message);
};

module.exports = {info: info, warn: warn, critical: critical};