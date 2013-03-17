var errors = require('../errors'),
	tank = require('./tank'),
	uav = require('./uav'),
	AVAILABLE_VEHICLES = {ground: tank, air: uav};


var allot = function (vehicle_type, callback) {
	'use strict';
	var Vehicle = AVAILABLE_VEHICLES[vehicle_type];

	if (!Vehicle) {
		throw errors.captain('We are running short of "' + vehicle_type + '" vehicles ');
	}

	return (new Vehicle());
};


module.exports = {allot: allot};