var errors = require('../errors'),
	turn = require('./turn'),
	directions = require('./directions'),
	grid = require('./grid'),
	Ticker = require('../ticker');


var Vehicle = function () {
	'use strict';
	this.grid = grid.create();
	this.movements = [];
	this.current_angle = 0;
};

Vehicle.prototype.move = function (direction, callback) {
	'use strict';
	var err = null,
		newDirection = null;
	try {
		if (directions.isValid(direction)) {
			newDirection = direction.useAngle(this.currentAngle());
			this.grid.move(newDirection);
		} else {
			throw errors.warn("Vehicle cannot move in direction: " + direction);
		}
	} catch (e) {
		err = e;
	}
	if (!!callback) {
		callback.call(this, err);
	}
};

Vehicle.prototype.turn = function (turnObj, callback) {
	'use strict';
	var err = null;

	if (turn.isValid(turnObj)) {
		this.current_angle += turnObj.angle;
	} else {
		err = errors.warn("Vehicle cannot turn: " + turnObj);
	}

	if (!!callback) {
		callback.call(this, err);
	}
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

Vehicle.prototype.facing = function () {
	'use strict';
	return {0: 'North', 90: 'East', 180: 'South', 270: 'West'}[this.currentAngle()];
};

Vehicle.prototype.loadInstructions = function (ticker, onComplete) {
	'use strict';
	var tickerObj = new Ticker(ticker),
		self = this,
		angles = Object.keys(turn).map(function (angle) { return turn[angle]; }),
		angle_codes = angles.map(function (angle) { return angle.code; }),
		vehicle_movements = this.movements.map(function (move) { return move.code; }),
		execute = function (code, next) {
			var	move_index = vehicle_movements.indexOf(code),
				angle_index = angle_codes.indexOf(code),
				err = null;

			// check if the code is for change of angle
			if (angle_index < 0) {
				// as the code wasn't for angle, check if the code meant to move
				if (move_index < 0) {
					// if none of them, then throw an error
					next(errors.critical("This vehicle cannot execute your command code: " + code));
					return;
				}

				self.move(self.movements[move_index], next);
			} else {
				// okay so the code says the vehicle should turn
				self.turn(angles[angle_index], next);
			}
		};

	tickerObj.executeInSeries(execute, function (err) {
		onComplete.call(self, err);
	});

};


module.exports = Vehicle;