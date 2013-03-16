var errors = require('../errors'),
	turn = require('./turn'),
	grid = require('./grid');


var Vehicle = function () {
	'use strict';
	this.grid = grid.create();
	this.movements = [];
};

Vehicle.prototype.move = function (direction) {
	'use strict';
	this.grid.move(direction);
};

Vehicle.prototype.turn = function (angle) {
	'use strict';
	this.grid.turn(angle);
};

Vehicle.prototype.loadDirections = function (ticker) {
	'use strict';

	var codes = ticker.split(''),
		self = this,
		angles = Object.keys(turn).map(function (angle) { return turn[angle]; }),
		angle_codes = angles.map(function (angle) { return angle.code; }),
		vehicle_movements = this.movements.map(function (move) { return move.code; });

	codes.forEach(function (code) {
		var move_index = vehicle_movements.indexOf(code),
			angle_index = angle_codes.indexOf(code);
		// check if the code is for change of angle
		if (angle_index < 0) {
			// as the code wasn't for angle, check if the code meant to move
			if (move_index < 0) {
				// if none of them throw an error
				throw errors.critical("This vehicle cannot execute your command code: " + code);
			}

			self.move(self.movements[move_index]);
		} else {
			// okay so the code says the vehicle should turn
			self.turn(angles[angle_index]);
		}
	});
};


module.exports = Vehicle;