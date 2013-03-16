var errors = require('../errors'),
	grid = require('./grid');


var Vehicle = function () {
	'use strict';
	this.grid = grid.create();
};

Vehicle.prototype.move = function (direction) {
	'use strict';
	this.grid.move(direction);
};

Vehicle.prototype.loadDirections = function (ticker) {
	'use strict';
	var directions = ticker.split(''),
		self = this,
		vehicle_movements = this.movements.map(function (move) { return move.code; });

	directions.forEach(function (direction) {
		if (vehicle_movements.indexOf(direction) < 0) {
			throw errors.critical("This vehicle cannot move in: " + direction);
		}
		self.move(direction);
	});
};


module.exports = Vehicle;