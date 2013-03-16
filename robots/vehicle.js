var errors = require('../errors'),
	turn = require('./turn'),
	grid = require('./grid');


var Vehicle = function () {
	'use strict';
	this.grid = grid.create();
	this.movements = [];
	this.current_angle = 0;
};

Vehicle.prototype.move = function (direction) {
	'use strict';
	var newDirection = direction.useAngle(this.currentAngle());
	this.grid.move(newDirection);
};

Vehicle.prototype.turn = function (turnObj) {
	'use strict';
	this.current_angle += turnObj.angle;
};

Vehicle.prototype.position = function () {
	'use strict';
	return this.grid.currentPosition();
};

Vehicle.prototype.currentAngle = function () {
	'use strict';

	var angle = (this.current_angle % 360);

	// turn negative angle to positive
	if (angle < 0) {
		angle = 360 + angle;
	}
	return angle;
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