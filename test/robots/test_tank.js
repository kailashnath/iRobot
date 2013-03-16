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
		expect(tank.movements).to.be.eql([directions.RIGHT, directions.LEFT, directions.FORWARD, directions.BACKWARD]);
	});

	it('should throw an error if asked to move in UPWARD/DOWNWARD directions', function () {
		var moveUp = function (){
			tank.loadDirections(directions.UPWARD.code);
		}, moveDown = function () {
			tank.loadDirections(directions.DOWNWARD.code);
		};

		expect(moveUp).to.throw(Error);
		expect(moveDown).to.throw(Error);
	});

});