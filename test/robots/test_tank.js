var Tank = require('../../robots/tank'),
	expect = require('chai').expect,
	directions = require('../../robots/directions'),
	Vehicle = require('../../robots/vehicle');


describe('Tank', function () {
	var tank = null;

	beforeEach(function () {
		tank = new Tank();
	});

	afterEach(function () {
		tank = null;
	});
	
	it('should be an instance of vehicle', function () {
		expect(tank).to.be.an.instanceof(Vehicle);
	});

	it('should be able to move only in RIGHT, LEFT, FORWARD and BACKWARD directions', function () {
		expect(tank.movements).to.be.eql([directions.FORWARD, directions.BACKWARD]);
	});

	it('should throw an error if asked to move in UPWARD/DOWNWARD directions', function () {
		tank.loadInstructions('U', function (err) {
			expect(err).to.be.instanceof(Error);
		});
		tank.loadInstructions('B', function (err) {
			expect(err).to.be.instanceof(Error);
		});
	});

});