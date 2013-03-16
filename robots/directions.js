var axis = require('./grid').axis;


var Move = function (code, axis, units) {
	'use strict';
	this.code = code;
	this.units = units;
	this.axis = axis;
};


module.exports = {
	FORWARD: new Move('F', axis.Y, 1),
	BACKWARD: new Move('B', axis.Y, -1),
	UPWARD: new Move('U', axis.Z, 10),
	DOWNWARD: new Move('D', axis.Z, -10)
};