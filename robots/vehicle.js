var errors = require('../errors');


var Vehicle = function () {
	'use strict';
};

Vehicle.prototype.loadDirections = function (ticker) {
	'use strict';
	var directions = ticker.split(''),
		vehicle_movements = this.movements;

	directions.forEach(function (direction) {
		if (vehicle_movements.indexOf(direction) < 0) {
			throw errors.critical("This vehicle cannot move in: " + direction);
		}
	});
};


module.exports = Vehicle;