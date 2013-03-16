var expect = require('chai').expect,
	axis = require('../../robots/grid').axis,
	direction = require('../../robots/directions');


describe('directions', function () {
	it('.FORWARD should be along Y axis with 1 unit', function () {
		var f = direction.FORWARD;
		expect(f.code).to.be.eql('F');
		expect(f.axis).to.be.eql(axis.Y);
		expect(f.units).to.be.eql(1);
	});

	it('.BACKWARD should be along Y axis with -1 unit', function () {
		var b = direction.BACKWARD;
		expect(b.code).to.be.eql('B');
		expect(b.axis).to.be.eql(axis.Y);
		expect(b.units).to.be.eql(-1);
	});

	it('.UPWARD should be along Z axis with 10 units', function () {
		var u = direction.UPWARD;
		expect(u.code).to.be.eql('U');
		expect(u.axis).to.be.eql(axis.Z);
		expect(u.units).to.be.eql(10);
	});


	it('.DOWNWARD should be along Z axis with -10 units', function () {
		var d = direction.DOWNWARD;
		expect(d.code).to.be.eql('D');
		expect(d.axis).to.be.eql(axis.Z);
		expect(d.units).to.be.eql(-10);
	});

});

describe('direction.useAngle in FORWARD direction', function () {
	it('should raise an exception for any angle other than 0, 90, 180 and 270', function () {
		var f = direction.FORWARD,
			useWrongAngle = function (angle) {
				return function () {
					f.useAngle(angle);
				};
			};
		expect(useWrongAngle(234)).to.throw(Error);
		expect(useWrongAngle(0.1)).to.throw(Error);
		expect(useWrongAngle(99)).to.throw(Error);
		expect(useWrongAngle(-23)).to.throw(Error);
	});

	it('should return a new direction if angle = 0 with axis along Y and positive units', function () {
		var f = direction.FORWARD,
			newDirection = f.useAngle(0);
		expect(newDirection.axis).to.be.eql(axis.Y);
		expect(newDirection.code).to.be.eql(f.code);
		expect(newDirection.units).to.be.above(0);
	});

	it('should return a new direction if angle = 90 with axis along X and positive units', function () {
		var f = direction.FORWARD,
			newDirection = f.useAngle(90);
		expect(newDirection.axis).to.be.eql(axis.X);
		expect(newDirection.code).to.be.eql(f.code);
		expect(newDirection.units).to.be.above(0);
	});

	it('should return a new direction if angle = 180 with axis along Y and negative units', function () {
		var f = direction.FORWARD,
			newDirection = f.useAngle(180);
		expect(newDirection.axis).to.be.eql(axis.Y);
		expect(newDirection.code).to.be.eql(f.code);
		expect(newDirection.units).to.be.below(0);
	});

	it('should return a new direction if angle = 270 with axis along X and negative units', function () {
		var f = direction.FORWARD,
			newDirection = f.useAngle(180);
		expect(newDirection.axis).to.be.eql(axis.Y);
		expect(newDirection.code).to.be.eql(f.code);
		expect(newDirection.units).to.be.below(0);
	});
});


describe('direction.useAngle in BACKWARD direction', function () {

	it('should return a new direction if angle = 0 with axis along Y and negative units', function () {
		var b = direction.BACKWARD,
			newDirection = b.useAngle(0);
		expect(newDirection.axis).to.be.eql(axis.Y);
		expect(newDirection.code).to.be.eql(b.code);
		expect(newDirection.units).to.be.below(0);
	});

	it('should return a new direction if angle = 90 with axis along X and negative units', function () {
		var b = direction.BACKWARD,
			newDirection = b.useAngle(90);
		expect(newDirection.axis).to.be.eql(axis.X);
		expect(newDirection.code).to.be.eql(b.code);
		expect(newDirection.units).to.be.below(0);
	});

	it('should return a new direction if angle = 180 with axis along Y and positive units', function () {
		var b = direction.BACKWARD,
			newDirection = b.useAngle(180);
		expect(newDirection.axis).to.be.eql(axis.Y);
		expect(newDirection.code).to.be.eql(b.code);
		expect(newDirection.units).to.be.above(0);
	});

	it('should return a new direction if angle = 270 with axis along X and positive units', function () {
		var b = direction.BACKWARD,
			newDirection = b.useAngle(180);
		expect(newDirection.axis).to.be.eql(axis.Y);
		expect(newDirection.code).to.be.eql(b.code);
		expect(newDirection.units).to.be.above(0);
	});
});