var expect = require('chai').expect,
	directions = require('../../robots/directions'),
	Vehicle = require('../../robots/vehicle');


describe('Vehicle', function () {
	var vehicle = null;

	beforeEach(function () {
		vehicle = new Vehicle();
	});

	afterEach(function () {
		vehicle = null;
	});

	it('should have it\'s own grid to move around', function () {
		expect(vehicle.grid).to.be.object;
	});

	it('should be able to move', function () {
		expect(vehicle.move).to.be.function;
	});

	it('should accept directions', function () {
		expect(vehicle.loadDirections).to.be.function;
	});

	it('should not accept directions if no movements are defined for it', function () {
		var callDirections = function () {
			vehicle.loadDirections('LU');
		};
		expect(callDirections).to.throw(Error);
	});

	it('should not move in the direction not mentioned in its movements', function () {
		vehicle.movements = [directions.RIGHT, directions.LEFT];
		var wrongDirection = function () {
			vehicle.loadDirections('RU');
		};
		expect(wrongDirection).to.throw(Error);
	});

	it('should move without error if the given directions are valid for the vehicle', function () {
		vehicle.movements = [directions.RIGHT, directions.LEFT];
		var correctDirection = function () {
			vehicle.loadDirections('RL');
		};
		expect(correctDirection).to.not.throw(Error);
	});

});