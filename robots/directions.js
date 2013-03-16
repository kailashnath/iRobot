var axis = require('./grid').axis;


var Move = function (code, onaxis, units) {
	'use strict';
	var self = this;
	this.code = code;
	this.units = units;
	this.axis = onaxis;

	this.useAngle = function (angle) {
		if (angle === 0) {
			self.axis = axis.Y;
		} else if (angle === 90) {
			self.axis = axis.X;
		} else if (angle === 180) {
			self.axis = axis.Y;
			self.units = -(self.units);
		} else if (angle === 270) {
			self.axis = axis.X;
			self.units = -(self.units);
		}
	};
};


module.exports = {
	FORWARD: new Move('F', axis.Y, 1),
	BACKWARD: new Move('B', axis.Y, -1),
	UPWARD: new Move('U', axis.Z, 10),
	DOWNWARD: new Move('D', axis.Z, -10)
};