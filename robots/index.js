var errors = require('../errors'),
	tank = require('./tank'),
	uav = require('./uav');


var AVAILABLE_VEHICLES = {ground: tank, air: uav};


var start = function (vehicle_type, callback) {
	'use strict';

	var vehicle_exists = Object.keys(AVAILABLE_VEHICLES).indexOf(vehicle_type) > -1;
	if (!vehicle_exists) {
		throw errors.warn('We do not have this type of vehicle: ' + vehicle_type);
	}

	var vehicle = AVAILABLE_VEHICLES[vehicle_type];
	return (new vehicle());
};


module.exports = {start: start};