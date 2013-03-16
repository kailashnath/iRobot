var util = require('util');


function BaseError(level, message, constructor) {
	'use strict';

	Error.captureStackTrace(this, constructor || this);
	this.message = util.format('%s: %s', level, message);
}

util.inherits(BaseError, Error);


function info(message) {
	'use strict';

	return new BaseError('Minor', message);
}

function warn(message) {
	'use strict';
	return new BaseError('Major', message);
}

function critical(message) {
	'use strict';
	return new BaseError('Critical', message);
}

module.exports = {info: info, warn: warn, critical: critical};