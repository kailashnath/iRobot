
var Turn = function (code, angle) {
	'use strict';
	this.code = code;
	this.angle = angle;
};


module.exports = {
	RIGHT: new Turn('R', 90),
	LEFT: new Turn('L', -90),
	isValid: function (obj) {
		'use strict';
		return (obj instanceof Turn);
	}
};