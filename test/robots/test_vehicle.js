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
		expect(vehicle.loadInstructions).to.be.function;
	});

	it('should be capable of turning both RIGHT and LEFT', function (done) {
		vehicle.loadInstructions('RLLLRRLRLLR', function (error) {
			expect(error).to.be.null;
			done();
		});
	});

	it('should not accept directions if no movements are defined for it', function (done) {
		vehicle.loadInstructions('RU', function (error) {
			expect(error).to.be.instanceof(Error);
			done();
		});
	});

	it('should not move in the direction not mentioned in its movements', function () {
		vehicle.movements = [directions.UPWARD, directions.DOWNWARD];
		var wrongDirection = function () {
			vehicle.loadInstructions('FB');
		};
		expect(wrongDirection).to.throw(Error);
	});

	it('should move without error if the given directions are valid for the vehicle', function (done) {
		vehicle.movements = [directions.UPWARD, directions.DOWNWARD];
		vehicle.loadInstructions('UD', function (err) {
			expect(err).to.be.null;
			done();
		});
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
		expect(vehicle.currentAngle()).to.be.eql(0);
		vehicle.move(directions.BACKWARD, function (err) {
			expect(err).to.be.instanceof(Error);
		});
	});


	it('should throw an error if the turn object is invalid', function (done) {
		vehicle.turn(null, function (err) {
			expect(err).to.be.instanceof(Error);
			done();
		});

	});

	it('should throw an error if asked to move in invalid direction', function (done) {
		vehicle.move(null, function (err) {
			expect(err).to.be.instanceof(Error);
			done();
		});
	});

	it('should give the appropriate position if the vehicle rotates over it\'s own axis', function (done) {
		vehicle.loadInstructions('RR', function (err) {
			expect(err).to.be.null;
			expect(this.facing()).to.be.eql('South');
			done();
		});
	});

	it('should give the facing even after it moves', function (done) {
		vehicle.movements = [directions.FORWARD, directions.UPWARD, directions.DOWNWARD];
		vehicle.loadInstructions('FFRUFFRFRLD', function (err) {
			expect(err).to.be.null;
			expect(this.facing()).to.be.eql('South');
			done();
		});
	});
});