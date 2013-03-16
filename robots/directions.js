var axis = require('./grid').axis,
	errors = require('../errors');


var Move = function (code, onaxis, units) {
	'use strict';
	var self = this;
	this.code = code;
	this.units = units;
	this.axis = onaxis;

	this.useAngle = function (angle) {
		if (this.axis === axis.Z) {
			return this;
		}
		var newMove = null;
		if (angle === 0) {
			newMove = new Move(self.code, axis.Y, self.units);
		} else if (angle === 90) {
			newMove = new Move(self.code, axis.X, self.units);
		} else if (angle === 180) {
			newMove = new Move(self.code, axis.Y, -(self.units));
		} else if (angle === 270) {
			newMove = new Move(self.code, axis.X, -(self.units));
		} else {
			throw errors.warn("Invalid angle: " + angle);
		}
		return newMove;
	};
};

module.exports = {
	FORWARD: new Move('F', axis.Y, 1),
	BACKWARD: new Move('B', axis.Y, -1),
	UPWARD: new Move('U', axis.Z, 10),
	DOWNWARD: new Move('D', axis.Z, -10),
	isValid: function (obj) {
		'use strict';
		return (obj instanceof Move);
	}
};