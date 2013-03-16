var expect = require('chai').expect,
	directions = require('../../robots/directions'),
	turn = require('../../robots/turn'),
	Vehicle = require('../../robots/vehicle'),
	grid = require('../../robots/grid');


describe('Grid', function () {
	var gridObject = null,
		vehicle = null;

	beforeEach(function () {
		gridObject = grid.create();
		vehicle = new Vehicle();
	});
	afterEach(function () {
		gridObject = null;
		vehicle = null;
	});

	it('should have co-ordinates (0,0,0) for any new instance of Grid', function () {
		expect(gridObject.currentPosition()).to.be.eql([0, 0, 0]);
	});

	it('should move the object on positive y-axis if the currentAngle is 0 degrees and direction = FORWARD', function () {
		expect(vehicle.currentAngle()).to.be.eql(0);
		vehicle.move(directions.FORWARD);
		expect(vehicle.grid.x).to.be.eql(0);
		expect(vehicle.grid.y).to.be.eql(1);
		expect(vehicle.grid.z).to.be.eql(0);
	});

	it('should move the object on negative y-axis if the currentAngle is 0 degrees and direction = BACKWARD', function () {
		expect(vehicle.currentAngle()).to.be.eql(0);
		vehicle.move(directions.FORWARD);
		vehicle.move(directions.FORWARD);
		vehicle.move(directions.BACKWARD);
		expect(vehicle.grid.x).to.be.eql(0);
		expect(vehicle.grid.y).to.be.eql(1);
		expect(vehicle.grid.z).to.be.eql(0);
	});

	it('should move the object on positive x-axis if the currentAngle of the vehicle is +90 degrees and direction = FORWARD', function () {
		vehicle.turn(turn.RIGHT);
		expect(vehicle.currentAngle()).to.be.eql(90);
		vehicle.move(directions.FORWARD);
		expect(vehicle.position()).to.be.eql([1, 0, 0]);
	});

	it('should move the object on negative x-axis if the currentAngle of the vehicle is -90 degrees and direction = FORWARD', function () {
		// move forward on x axis by 2 points
		vehicle.turn(turn.RIGHT);
		expect(vehicle.currentAngle()).to.be.eql(90);
		vehicle.move(directions.FORWARD);
		vehicle.move(directions.FORWARD);

		// turn left and move on positive y-axis by 1 point
		vehicle.turn(turn.LEFT);
		expect(vehicle.currentAngle()).to.be.eql(0);
		vehicle.move(directions.FORWARD);
		expect(vehicle.position()).to.be.eql([2, 1, 0]);

		// now turn -90 degrees
		vehicle.turn(turn.LEFT);
		expect(vehicle.currentAngle()).to.be.eql(270);
		vehicle.move(directions.FORWARD);
		expect(vehicle.position()).to.be.eql([1, 1, 0]);

	});

	it('should raise an error if the object tends to move away from the grid', function () {
		var moveInWrongDirection = function () {
			vehicle.move(directions.FORWARD);
		};

		expect(vehicle.position()).to.be.eql([0, 0, 0]);
		vehicle.turn(turn.LEFT);
		expect(vehicle.currentAngle()).to.be.eql(270);
		vehicle.move(directions.FORWARD, function (err) {
			expect(err).to.be.instanceof(Error);
		});
	});

});
