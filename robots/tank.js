var util = require('util'),
	directions = require('./directions'),
	Vehicle = require('./vehicle');


var Tank = function (soldier) {
	'use strict';
	Vehicle.call(this, soldier);
	this.movements = [directions.FORWARD, directions.BACKWARD];
};

util.inherits(Tank, Vehicle);

module.exports = Tank;