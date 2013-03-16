var util = require('util'),
	directions = require('./directions'),
	Vehicle = require('./vehicle');


var UAV = function () {
	'use strict';
	Vehicle.call(this);
	this.movements = [directions.FORWARD, directions.UPWARD, directions.DOWNWARD];
};

util.inherits(UAV, Vehicle);

module.exports = UAV;