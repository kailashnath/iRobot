var expect = require('chai').expect,
	axis = require('../../robots/grid').axis,
	direction = require('../../robots/directions');


describe('directions', function () {
	it('.RIGHT should be along X axis with 1 unit', function () {
		var x = direction.RIGHT;
		expect(x.code).to.be.eql('R');
		expect(x.axis).to.be.eql(axis.X);
		expect(x.units).to.be.eql(1);
	});

	it('.LEFT should be along X axis with -1 unit', function () {
		var l = direction.LEFT;
		expect(l.code).to.be.eql('L');
		expect(l.axis).to.be.eql(axis.X);
		expect(l.units).to.be.eql(-1);
	});

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