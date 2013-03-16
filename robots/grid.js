

var Grid = function (a) {
	'use strict';
	this.x = 0;
	this.y = 0;
	this.z = 0;
};

Grid.prototype.move = function (direction) {
	'use strict';
	//console.log(direction.units);
};


module.exports = {
	create: function () {
		'use strict';

		return new Grid();
	}
};