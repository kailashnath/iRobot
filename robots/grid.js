var errors = require('../errors'),
	util = require('util');


var Axis = {X: 'x', Y: 'y', Z: 'z'};

var Grid = function (x, y, z) {
	'use strict';
	this[Axis.X] = x || 0;
	this[Axis.Y] = y || 0;
	this[Axis.Z] = z || 0;
};

Grid.prototype.move = function (direction) {
	'use strict';
	var current_position_by_axis = this[direction.axis],
		moved_position = current_position_by_axis + direction.units;
	if (moved_position < 0) {
		if (direction.axis === Axis.Z) {
			throw errors.captain('Are you sure you want me to crash');
		} else {
			throw errors.captain('Sorry a soldier can\'t go out of the war zone');
		}
	}
	this[direction.axis] = moved_position;
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