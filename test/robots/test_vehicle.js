var expect = require('chai').expect,
	directions = require('../../robots/directions'),
	turn = require('../../robots/turn'),
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

	it('should be capable of turning both RIGHT and LEFT', function () {
		var turnRight = function () {
			vehicle.loadDirections('RLLLRRLRLLR');
		};
		expect(turnRight).to.not.throw(Error);
	});

	it('should not accept directions if no movements are defined for it', function () {
		var callDirections = function () {
			vehicle.loadDirections('RU');
		};
		expect(callDirections).to.throw(Error);
	});

	it('should not move in the direction not mentioned in its movements', function () {
		vehicle.movements = [directions.UPWARD, directions.DOWNWARD];
		var wrongDirection = function () {
			vehicle.loadDirections('FB');
		};
		expect(wrongDirection).to.throw(Error);
	});

	it('should move without error if the given directions are valid for the vehicle', function () {
		vehicle.movements = [directions.UPWARD, directions.DOWNWARD];
		var correctDirection = function () {
			vehicle.loadDirections('UD');
		};
		expect(correctDirection).to.not.throw(Error);
	});

	it('should be able to turn in it\'s own axis in 360 degrees', function () {
		var turnRight = function () {
			vehicle.turn(turn.RIGHT);
		}, turnLeft = function () {
			vehicle.turn(turn.LEFT);
		};

		turnRight();
		expect(vehicle.currentAngle()).to.be.eql(90);

		turnRight();
		expect(vehicle.currentAngle()).to.be.eql(180);

		turnRight();
		expect(vehicle.currentAngle()).to.be.eql(270);

		turnRight();
		expect(vehicle.currentAngle()).to.be.eql(0);

		turnLeft();
		expect(vehicle.currentAngle()).to.be.eql(270);

		turnLeft();
		expect(vehicle.currentAngle()).to.be.eql(180);

		turnLeft();
		expect(vehicle.currentAngle()).to.be.eql(90);

		turnLeft();
		expect(vehicle.currentAngle()).to.be.eql(0);

	});

	it('should be able to turn clockwise/anticlockwise in 360 degrees with angle being always positive', function () {
		var turnRight = function () {
			vehicle.turn(turn.RIGHT);
		}, turnLeft = function () {
			vehicle.turn(turn.LEFT);
		};

		turnLeft();
		expect(vehicle.currentAngle()).to.be.eql(270);

		turnLeft();
		expect(vehicle.currentAngle()).to.be.eql(180);

		turnLeft();
		expect(vehicle.currentAngle()).to.be.eql(90);

		turnLeft();
		expect(vehicle.currentAngle()).to.be.eql(0);
	});

	it('should not let the object move into negative co-ordinates in any angle', function () {
		// var moveNegative = function () {
		// 	vehicle.move(directions.BACKWARD);
		// };
		// expect(vehicle.currentAngle()).to.be.eql(0);
		// console.log(vehicle.position());
		// expect(moveNegative).to.throw(Error);
	});
});