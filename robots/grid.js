
var Axis = {X: 'x', Y: 'y', Z: 'z'};

var Grid = function () {
	'use strict';
	this[Axis.X] = 0;
	this[Axis.Y] = 0;
	this[Axis.Z] = 0;
};

Grid.prototype.move = function (direction) {
	'use strict';
};


module.exports = {
	create: function () {
		'use strict';

		return new Grid();
	},
	axis: Axis
};