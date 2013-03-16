var errors = require('../errors'),
	tank = require('./tank'),
	uav = require('./uav'),
	AVAILABLE_VEHICLES = {ground: tank, air: uav};


var start = function (vehicle_type, callback) {
	'use strict';
	var Vehicle = AVAILABLE_VEHICLES[vehicle_type];

	if (!Vehicle) {
		throw errors.warn('We do not have this type of vehicle: ' + vehicle_type);
	}

	return (new Vehicle());
};


module.exports = {start: start};