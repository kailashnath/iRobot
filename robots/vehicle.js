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
	if (!this.movements) {
		throw errors.critical('This vehicle needs to know it\'s movemements before it can accept directions');
	}
	var directions = ticker.split(''),
		self = this,
		vehicle_movements = this.movements.map(function (move) { return move.code; });

	directions.forEach(function (direction) {
		var move_index = vehicle_movements.indexOf(direction);
		if (move_index < 0) {
			throw errors.critical("This vehicle cannot move in: " + direction);
		}
		self.move(self.movements[move_index]);
	});
};


module.exports = Vehicle;