var util = require('util'),
	directions = require('./directions'),
	Vehicle = require('./vehicle');


var Tank = function () {
	'use strict';
	Vehicle.call(this);
	this.movements = [directions.FORWARD, directions.BACKWARD];
};

util.inherits(Tank, Vehicle);

module.exports = Tank;