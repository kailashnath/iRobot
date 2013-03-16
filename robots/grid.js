var errors = require('../errors'),
	util = require('util');


var Axis = {X: 'x', Y: 'y', Z: 'z'};

var Grid = function () {
	'use strict';
	this[Axis.X] = 0;
	this[Axis.Y] = 0;
	this[Axis.Z] = 0;
	this.current_angle = 0;
};

Grid.prototype.move = function (direction) {
	'use strict';
	var current_position_by_axis = this[direction.axis],
		moved_position = current_position_by_axis + direction.units;

	if (moved_position < 0) {
		throw errors.critical(util.format('Cannot move in %s axis by %s points', direction.axis, direction.units));
	}
	this[direction.axis] = moved_position;
};


Grid.prototype.turn = function (turn) {
	'use strict';
	this.current_angle += turn.angle;
};

Grid.prototype.currentPosition = function () {
	'use strict';
	var self = this;
	return [Axis.X, Axis.Y, Axis.Z].map(function (axis) {
		return self[axis];
	});
};


module.exports = {
	create: function () {
		'use strict';

		return new Grid();
	},
	axis: Axis
};