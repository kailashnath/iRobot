
var Move = function (code, units) {
	'use strict';
	this.code = code;
	this.units = units;
};


module.exports = {
	RIGHT: new Move('R', 1),
	LEFT: new Move('L', 1),
	FORWARD: new Move('F', 1),
	BACKWARD: new Move('B', 1),
	UPWARD: new Move('U', 10),
	DOWNWARD: new Move('D', 10)
};