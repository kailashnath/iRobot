var errors = require('../errors'),
	tank = require('./tank'),
	uav = require('./uav'),
	AVAILABLE_VEHICLES = {ground: tank, air: uav},
	random_names = ['Carlton',
					'Hanna',
					'Thomasine',
					'Kenyetta',
					'Breann',
					'Kathryne',
					'Janine',
					'Tommy',
					'Janetta',
					'Carole',
					'Pearl',
					'Kathie',
					'Barbar',
					'Anjelica',
					'Arlen',
					'Myrle',
					'Launa',
					'Gil',
					'Sade',
					'Barney'];


var allot = function (vehicle_type, callback) {
	'use strict';
	var Vehicle = AVAILABLE_VEHICLES[vehicle_type],
		random_soldier_index = Math.floor((Math.random() * random_names.length)),
		soldier = random_names[random_soldier_index];

	if (!Vehicle) {
		throw errors.captain(soldier, 'We are running short of "' + vehicle_type + '" vehicles ');
	}

	return (new Vehicle(soldier));
};


module.exports = {allot: allot};