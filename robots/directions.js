var axis = require('./grid').axis;


var Move = function (code, onaxis, units) {
	'use strict';
	var self = this;
	this.code = code;
	this.units = units;
	this.axis = onaxis;

	this.useAngle = function (angle) {
		var newMove = null;
		if (angle === 0) {
			newMove = new Move(self.code, axis.Y, self.units);
		} else if (angle === 90) {
			newMove = new Move(self.code, axis.X, self.units);
		} else if (angle === 180) {
			newMove = new Move(self.code, axis.Y, -(self.units));
		} else if (angle === 270) {
			newMove = new Move(self.code, axis.X, -(self.units));
		}
		return newMove;
	};
};

module.exports = {
	FORWARD: new Move('F', axis.Y, 1),
	BACKWARD: new Move('B', axis.Y, -1),
	UPWARD: new Move('U', axis.Z, 10),
	DOWNWARD: new Move('D', axis.Z, -10)
};